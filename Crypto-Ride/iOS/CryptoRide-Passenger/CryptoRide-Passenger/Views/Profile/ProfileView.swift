//
//  ProfileView.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 10/17/22.
//

import SwiftUI
import CodeScanner
import web3swift

struct ProfileView:View {
    // Init profile view model
    @StateObject var profileVM = ProfileViewModel()
    @EnvironmentObject var balance:Balance
    @EnvironmentObject var reputation:Reputation
    
    @State private var isShowingScanner = false
    @State var isTransfer = false
    // Transferable tokens
    var tokens = ["cUSD","CELO"]
    
    var body: some View {
        ScrollView {
        VStack(alignment: .center) {
            VStack{

                    Text("Rating ")
                    RatingView(rating:reputation.rating)
               
                    Text("Reputation")
                    Text(reputation.reputation)
                
                    Text("Total Rides")
                    Text(reputation.rideCount)
                
                }
                HStack{
                    HStack{
                        Image("cUSDEx")
                            .resizable()
                            .scaledToFit()
                            .frame(width: 40, height: 30, alignment: .center)
                        Text("\(balance.cUSD)")
                        
                    }
                    Divider()
                    HStack{
                        Image("CeloEx")
                            .resizable()
                            .scaledToFit()
                            .frame(width: 40, height: 40, alignment: .center)
                        Text("\(balance.CELO)")
                        
                    }
                    Button{
                        balance.getTokenBalance(.CELO)
                        balance.getTokenBalance(.cUSD)
                        reputation.getReputation()
                    }label: {
                        Image(systemName: "arrow.clockwise.circle.fill")
                            .resizable()
                            .interpolation(.none)
                            .scaledToFit()
                            .frame(width: 20, height: 20, alignment: .center)
                    }.buttonStyle(.borderless)
                    
                }.padding()
                

            VStack{
                Text("To Address").font(.title3)
                HStack{
                    TextField("0x00", text: $profileVM.toAddress)
                    Button(action:{
                        profileVM.toAddress = UIPasteboard.general.string ?? ""
                    }, label: {
                        Image(systemName: "doc.on.clipboard")
                    })
                }
                HStack{
                    Text("Send").font(.title3)
                    Picker("", selection: $profileVM.tokenSelected) {
                                    ForEach(tokens, id: \.self) {
                                        Text($0)
                            }
                    }
                }

                HStack{
                    TextField("0", text:  $profileVM.amount)
                    Button(action:{
                        if profileVM.tokenSelected == "cUSD" {
                            profileVM.amount = balance.cUSD
                        }else{
                            profileVM.amount = balance.CELO
                        }
                    }, label: {
                        Text("MAX")
                    })
                }
                
                TextField("Wallet Password", text: $profileVM.password)
                    .multilineTextAlignment(.center)
                    .textFieldStyle(.roundedBorder)
                if isTransfer{
                    ProgressView()
                }
                Button(action:{
                    isTransfer = true
                    profileVM.transfer(){ success in
                        // Get request for token balance
                        balance.getTokenBalance(.cUSD)
                        balance.getTokenBalance(.CELO)
                        // Clear all inputs
                        profileVM.amount = ""
                        profileVM.toAddress = ""
                        profileVM.password = ""
                        isTransfer = false
                    }
                }, label: {
                    Text("Send")
                }).disabled(profileVM.toAddress.isEmpty || profileVM.amount.isEmpty || isTransfer )
                
            }
            
            
            Divider()
            Text("Receive").font(.title3)
            // Clickable qr code past address to device pasteboard
            Button(action: {
                UIPasteboard.general.string = ContractServices.shared.getWallet().address
            }, label: {
                Image(uiImage:profileVM.generateQRCode(from: ContractServices.shared.getWallet().address))
                    .resizable()
                    .interpolation(.none)
                    .scaledToFit()
                    .padding()
                    .frame(width: 230, height: 230)
            })
            Text(ContractServices.shared.getWallet().address).font(.body).bold().lineLimit(2)
            // Part of the qr code Scanner currently not used
        }.alert(item:$profileVM.error) { error in
            Alert(title: Text(profileVM.error!.title), message: Text(profileVM.error!.description), dismissButton: .cancel() {
                    profileVM.error = nil
                    profileVM.amount = ""
                    profileVM.toAddress = ""
                    profileVM.password = ""
                    isTransfer = false
                })
        }
        
        
        .sheet(isPresented: $isShowingScanner) {
            CodeScannerView(codeTypes: [.qr] ) { response in
                isShowingScanner = false
                switch response {
                case .success(let result):
                    // If qr was read successful try to separate ethereum string from qr
                    // Note there is no standard for reading qr codes, this is using MetaMask format
                    let ethereumAddress = result.string.components(separatedBy: "ethereum:")
                    if ethereumAddress.isEmpty {return}
                    guard let toEthAddress = EthereumAddress(ethereumAddress[1]) else {
                        return
                    }
                    
                    //profileVM.txParams.to = toEthAddress.address
                    
                case .failure(let error):
                    print(error.localizedDescription)
                }
            }
        }.textFieldStyle(.roundedBorder)
            .padding(EdgeInsets(top: 8, leading: 16,
                                   bottom: 8, trailing: 16))
            .buttonStyle(.borderedProminent)
        }
    }
}

