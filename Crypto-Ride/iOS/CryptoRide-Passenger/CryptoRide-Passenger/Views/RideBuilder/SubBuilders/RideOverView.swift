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
    @EnvironmentObject var balance:Balance
    @EnvironmentObject var builderVm:MainBuilderViewModel
    
    @State var isLoading = false
    
    var body: some View {
        VStack{
            
            Spacer()
            if isLoading == false {
                HStack{
                    Button(action:{
                        builderVm.builderStates = .selectDrivers
                    } , label: {
                        Image(systemName: "chevron.left")
                    }).padding()
                    
                        .buttonStyle(.borderedProminent)
                    Spacer()
                    Button(action:{
                        let drivers = manager.drivers.map {$0.address}
                        print("BroadCast ride")
                        isLoading = true
                        ride.broadCastRide(startLocation:ride.startLocation!, endLocation: ride.endLocation!, driverlist: drivers, ridePrice: manager.normalizedPrice) {
                             result in
                            // update ride if broad cast was successful
                            ride.passengerState = .inRide
                        }
                        
                    } , label: {
                        Image(systemName: "paperplane.fill")
                    }).padding()
                    
                    
                        .buttonStyle(.borderedProminent)
                }
                VStack{
                    
                    HStack{
                        Text("Drivers").bold()
                        Spacer()
                        Text("Price").bold()
                    }
                    
                    VStack(alignment: .leading, spacing: 5){
                        ForEach(manager.drivers, id: \.address) { driver in
                            HStack{
                                Spacer()
                                VStack(alignment: .leading) {
                                    Text("\(driver.info!.infoAssetLink!)").font(.subheadline).bold()
                                    Text("\(driver.info!.carAssetLink!)").font(.subheadline).bold()
                                    
                                }
                                Spacer()
                                VStack{
                                    Text("$ \(driver.info!.rate!.description)").font(.subheadline).bold()
                                }
                                Spacer()
                            }
                        }
                    }
                    Divider()
                    if manager.route != nil {
                        VStack{
                            Text("Route").font(.headline).bold()
                            HStack{
                                
                                Text(" \((manager.route!.distance * 3.28084) / 5280 ) Miles")
                                Text(" \(manager.route!.expectedTravelTime / 60) Min ")
                            }
                        }
                        Divider()
                    }
                    VStack{
                        Text("Balance").font(.headline).bold()
                        HStack {
                            Text("\(balance.cUSD) cUSD").font(.body).bold()
                            Spacer()
                            Text("\(balance.CELO) CELO").font(.body).bold()
                        }
                        
                    }
                    Divider()
                    Text("Recommend Price").font(.headline).bold()
                    HStack{
                        
                        Text("\(String(format: "%.0f", manager.normalizedPrice)) cUSD").font(.body).bold()
                        // Limit ride price to under 500
                        Stepper("Adjust Price", value: $manager.normalizedPrice, in: 1...500).font(.subheadline)
                    }
                    Divider()
                    
                    HStack{
                        Text("Funds Approved")
                        if(balance.celoApproved.isEmpty){
                            ProgressView()
                        }else{
                            Text("\(balance.celoApproved) cUSD")
                            if balance.celoApproved == "0" {
                                Button{
                                    
                                    // Call token approval then double check allowance
                                    balance.setApproval() { success in
                                        balance.getAllowance(address: rideManagerAddress.address)
                                    }
                                    
                                }label: {
                                    Text("Approve")
                                }.buttonStyle(.borderedProminent)
                            }
                            
                        }
                    }
            }.background(.bar)
            }else{
                VStack{
                    HStack{Spacer()}
                    ProgressView().tint(.blue)
                    Text("Sending Ride To Network")
                }.background(.bar)

            }
        }
        
    }
}

struct RideOverView_Previews: PreviewProvider {
    static var previews: some View {
        RideOverView()
    }
}
