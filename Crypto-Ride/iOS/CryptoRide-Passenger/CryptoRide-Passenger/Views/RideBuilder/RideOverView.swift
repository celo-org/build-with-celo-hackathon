//
//  RideOverView.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 9/15/22.
//

import Foundation
import SwiftUI


struct RideOverView:View {

    @EnvironmentObject var manager:LocationManager
    @EnvironmentObject var ride:RideService
    
    
    var body: some View {
        Spacer()
        VStack{
            Text("Drivers").font(.title).bold()
            VStack(alignment: .center, spacing: 5){
                ForEach(manager.drivers, id: \.address) { driver in
                    VStack {
                        Text("\(driver.info!.infoAssetLink!)").font(.title3).bold()
                        Text("\(driver.info!.carAssetLink!)").font(.title3).bold()
                        }
                       
                        
                }
            }
            Divider()
            HStack{
                Text("$ \(String(format: "%.0f", manager.normalizedPrice))").font(.title2).bold()
                // Limit ride price to under 500
                Stepper("Adjust Ride Price", value: $manager.normalizedPrice, in: 1...500).font(.subheadline)
            }
            Divider()
            
            HStack{
                Text("Funds Approved")
                if(ride.currentApprovedAmount == nil){
                    ProgressView()
                }else{
                    Text("$\(ride.currentApprovedAmount!.description)")
                    Button{
                        // Call token approval then double check allowance
                        ride.setApproval() { success in
                            print("Contract Approval")
                            ride.getAllowance(address: ContractServices.shared.getWallet().address)
                        }
                        
                    }label: {
                        Text("Approve")
                    }.buttonStyle(.borderedProminent)
                }
                

            }

        }.background(.bar)

    }
}

struct RideOverView_Previews: PreviewProvider {
    static var previews: some View {
        RideOverView()
    }
}
