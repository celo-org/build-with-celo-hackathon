//
//  FundRegistration.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/23/22.
//

import SwiftUI
import web3swift

struct FundRegistration: View {
    
    @EnvironmentObject var profileVM:ProfileViewModel
    
    let wallet = ContractServices.shared.getWallet()

    
    var body: some View {
        VStack(alignment: .leading){
            Spacer()
            Text("Fund Your Driver Wallet Address").font(.title3)
            
            Button(action: {
                UIPasteboard.general.string = wallet.address
            }, label: {
                VStack{
                    Text(wallet.address).font(.callout)
                    Image(uiImage:profileVM.generateQRCode(from: wallet.address))
                        .resizable()
                        .interpolation(.none)
                        .scaledToFit()
                        .padding()
                        .frame(width: 230, height: 230)
                }

            })
                .buttonStyle(.bordered)
            
            Text("Balance").font(.title)
            HStack{
                Text("cUSD:\(profileVM.balance)").font(.title3)
                Button{
                    profileVM.getTokenBalance()
                }label: {
                    Image(systemName: "arrow.clockwise.circle.fill")
                        .resizable()
                        .interpolation(.none)
                        .scaledToFit()
                        .frame(width: 40, height: 40, alignment: .center)
                }
            }
            
            Spacer()
        }

    }
}

struct FundRegistration_Previews: PreviewProvider {
    static var previews: some View {
        FundRegistration()
    }
}
