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
    @EnvironmentObject var balance:Balance
    
    let wallet = ContractServices.shared.getWallet()

    
    var body: some View {
        VStack(){
            Spacer()
            Text("Fund Your Driver Wallet Address").font(.title3).bold()
            Text(wallet.address).font(.callout)
            Button(action: {
                UIPasteboard.general.string = wallet.address
            }, label: {
                VStack{
                    
                    Image(uiImage:profileVM.generateQRCode(from: wallet.address))
                        .resizable()
                        .interpolation(.none)
                        .scaledToFit()
                        .padding()
                        .frame(width: 230, height: 230)
                }

            })
            .buttonStyle(.borderedProminent)
            
            Text("Balance").font(.title)
            HStack{
                Text("CELO:\(balance.CELO)").font(.title3)
                Text("cUSD:\(balance.cUSD)").font(.title3)
                Button{
                    balance.getTokenBalance(.CUSD)
                    balance.getTokenBalance(.Celo)
                }label: {
                    Image(systemName: "arrow.clockwise.circle.fill")
                        .resizable()
                        .interpolation(.none)
                        .scaledToFit()
                        .frame(width: 40, height: 40, alignment: .center)
                }
            }
            SecureField("Wallet Password", text: $profileVM.password)
                .multilineTextAlignment(.center) 
                .textFieldStyle(.roundedBorder)
            Spacer()
        }

    }
}

struct FundRegistration_Previews: PreviewProvider {
    static var previews: some View {
        FundRegistration()
    }
}
