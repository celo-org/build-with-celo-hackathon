//
//  RideOverView.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 9/15/22.
//

import Foundation
import SwiftUI
import BigInt


struct RideOverView:View {
    
    @EnvironmentObject var manager:LocationManager
    @EnvironmentObject var ride:RideService
    @EnvironmentObject var balance:Balance
    @EnvironmentObject var builderVm:MainBuilderViewModel
    
    @State var isLoading = false
    @State var isApproveIsLoading = false
    
    var body: some View {
        VStack{
            HStack{
                Button(action: {
                    
                }, label: {
                    Text("$\(balance.cUSD) cUSD").font(.body)
                }).clipShape(Capsule())
                    .buttonStyle(.bordered)
                Spacer()
                Button(action: {
                    
                }, label: {
                    Text("\(balance.CELO) CELO")
                        .font(.body)
                        .clipShape(Capsule())
                })
                    .buttonStyle(.bordered)
            }

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
                        isLoading = true
                        ride.broadCastRide(startLocation:ride.startLocation!, endLocation: ride.endLocation!, driverlist: drivers, ridePrice: BigUInt(builderVm.ridePrice)) {
                             result in
                            // update ride if broad cast was successful
                            ride.passengerState = .inRide
                        }
                        
                    } , label: {
                        Image(systemName: "paperplane.fill")
                    }).padding()
                        .disabled(!builderVm.isApproved) // Dont broadcast if not approved
                        .buttonStyle(.borderedProminent)
                }
                VStack(spacing: 15){
                    
                    HStack(){
                        Spacer()
                        Text("Drivers").bold()
                        Spacer()
                 
                        HStack{
                            
                            ForEach(manager.drivers, id: \.address) { driver in
                                
                               
                                    Image(systemName: "car.fill")
                            }
                        }
                        Spacer()
                     
                    }
                    if manager.route != nil {
                        HStack{
                            Spacer()
                            Text("Route").font(.headline).bold()
                               
                            Spacer()
                            
                            Text(" \(String(format: "%.0f",(manager.route!.distance * 3.28084) / 5280 )) Miles")
                            Text(" \(String(format: "%.0f",(manager.route!.expectedTravelTime / 60))) Min ")
                            
                            Spacer()
                    
                        }
                        
                    }
                    Divider()
                    VStack(alignment: .leading, spacing: 5){
                        HStack{
                            Text("Ride Price").font(.title2).bold()
                            Spacer()
                            HStack {
                                Text("Recommended").font(.headline)
                                Text("\(String(format: "%.0f", manager.recommendedPrice)) cUSD").font(.subheadline).bold()
                                Spacer()
                            }
                        }
                        
                        if manager.recommendedPrice + 15 < manager.normalizedPrice  {
                            Text("Price too high, you might be over paying for ride.").font(.footnote)
                        }else if manager.recommendedPrice - 15 > manager.normalizedPrice {
                            Text("Price too low, drivers may turn down your ride .").font(.footnote)
                        }
                        
                        HStack{
                           
                            Spacer()
                            Text("\(String(format: "%.0f", manager.normalizedPrice)) cUSD").font(.body).bold()
                            Spacer()
                            // Limit ride price to under 500
                            Stepper("Adjust Price", value: $manager.normalizedPrice, in: 1...500).font(.subheadline)
                        }
                    }
    
                    HStack{
                        Spacer()
                        if(isApproveIsLoading){
                            ProgressView().tint(.blue)
                        }else if !builderVm.isApproved {
                            Button{
                                isApproveIsLoading = true
                                // Call token approval
                                balance.setApproval(amount: manager.normalizedPrice) { success in
                                    isApproveIsLoading = false
                                    builderVm.isApproved = true
                                    
                                }
                                
                            }label: {
                                Text("Approve Funds")
                            }.buttonStyle(.borderedProminent)
                                
                        }else{
                           
                            Text("Funds Appoved").font(.title2).bold()
                            Image(systemName: "checkmark.circle").foregroundColor(.blue)
                                
                        }
                        Spacer()
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
