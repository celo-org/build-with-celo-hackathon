//
//  ProfileView.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 10/17/22.
//

import SwiftUI
import CodeScanner
import web3swift

struct TxParams {
    var from:String = ""
    var to:String = ""
    var value:String = ""
}


struct ProfileView:View {
    
    //@EnvironmentObject var balanceVM:BalanceViewModel
    @StateObject var profileVM = ProfileViewModel()
    @EnvironmentObject var balance:Balance
    @EnvironmentObject var reputation:Reputation
    
    @State private var isShowingScanner = false
    
    
    var body: some View {
        
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
                    Text("Balance")
                    Text("\(balance.CELO) CELO")
                    Text("$\(balance.cUSD) cUSD")
                }.padding()
                
                //Text(balanceVM.balance)
        
            //}
            VStack{
                Text("To Address").font(.title3)
                HStack{
                    TextField("0x00", text: $profileVM.toAddress)
                    Button(action:{
                        print("past")
                    }, label: {
                        Image(systemName: "doc.on.clipboard")
                    })
                }
                Text("Send cUSD").font(.title3)
                HStack{
                    
                    TextField("0", text:  $profileVM.amount)
                    Button(action:{
                        print("MAX")
                    }, label: {
                        Text("MAX")
                    })
                }
                Button(action:{
                    print("SEND")
                }, label: {
                    Text("Send")
                })
                
            }
            
            
            Divider()
            Text("Receive").font(.title3)
            
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
                
            //Divider()


        }.sheet(isPresented: $isShowingScanner) {
            CodeScannerView(codeTypes: [.qr] ) { response in
                isShowingScanner = false
                switch response {
                case .success(let result):
                    let ethereumAddress = result.string.components(separatedBy: "ethereum:")
                    if ethereumAddress.isEmpty {return}
                    guard let toEthAddress = EthereumAddress(ethereumAddress[1]) else {
                        return
                    }
                    
                    profileVM.txParams.to = toEthAddress.address
                    
                case .failure(let error):
                    print(error.localizedDescription)
                }
            }
        }.textFieldStyle(.roundedBorder)
            .padding(EdgeInsets(top: 8, leading: 16,
                                   bottom: 8, trailing: 16))
            .buttonStyle(.borderedProminent)
            .toolbar {
 
                ToolbarItem(placement: .navigationBarTrailing) {
                    NavigationLink(destination: Settings()
                    ){
                        Image(systemName: "gear")
                    }
                }
    
            }
    }
}

