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
    
    @EnvironmentObject var balanceVM:BalanceViewModel
    @StateObject var profileVM = ProfileViewModel()
    
    @State private var isShowingScanner = false
    
    
    var body: some View {
        
        VStack(alignment: .center) {
            Text("Profile")
            Image(systemName: "person.crop.circle")
            Text(balanceVM.balance)
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
                .buttonStyle(.bordered)
            Divider()
            Text("Send").font(.title3)
  
            Text("Previous rides prices")
            
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
        }
    }
    
}
