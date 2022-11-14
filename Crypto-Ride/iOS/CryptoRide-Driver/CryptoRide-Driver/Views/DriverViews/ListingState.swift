//
//  ListingState.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/30/22.
//

import SwiftUI

struct ListingState: View {
    
    @EnvironmentObject var webSocket:WebSockets
    @EnvironmentObject var rideService:RideService
    @EnvironmentObject var manager:LocationManager
    @EnvironmentObject var driver:Driver
    // Passenger rating and reputation
    @State var passengerRR:Passenger? = nil
    
    @State var isLoading = false
    
    
    func checkPrice() -> Bool {
        
  
        let driverPrice = Double(manager.driverRidePrice!)
        let ridePrice = Double(webSocket.tempRide!.price)!
    
        if (driverPrice - 10) > ridePrice {
            return false
        }else{
            return true
        }
        
    }
    
    var body: some View {
        VStack{
            HStack(alignment: .top){
                Spacer()
                Button(action: {
                    // Toggle listening for rides
                    webSocket.acceptingNewRides.toggle()
                    manager.isActive.toggle()
                    
                }, label: {
                    if  webSocket.acceptingNewRides && manager.isActive {
                        HStack(spacing: 5){
                            Text("Stop")
                            ProgressView().tint(.white)
                        }
                    }else{
                        
                            Text("Start")
                            
                    }
                })
            }

            Spacer()
            if isLoading {
                ProgressView().tint(.blue)
            }else{
                
            if webSocket.wasAcceptedByDriver {
                Button(action: {
                    rideService.removeAll = true
                    rideService.rideId = nil
                    webSocket.wasAcceptedByDriver = false
                    webSocket.showInterest = false
                }, label: {
                    Text("Ride excepted by another driver")
                })
            }
                
            // only present if announced ride not nil
            if webSocket.newAnnounceRide != nil {
                
                if !webSocket.showInterest {
                    Button(action: {
                        // get ride details about new announce ride
                        rideService.getRide(rideId: webSocket.newAnnounceRide!.rideId) {
                            ride in
                        
                            // set temp ride
                            webSocket.tempRide = ride
                            
                            // set map coords locations
                            rideService.ride.startCoordinates = ride.startCoordinates
                            rideService.ride.endCoordinates = ride.endCoordinates
                            
                            // set annotations
                            rideService.startAnnotation.coordinate = ride.startCoordinates!
                            rideService.endAnnotation.coordinate = ride.endCoordinates!
                            
                            rideService.updateRoute = true
                            webSocket.showInterest = true
                            rideService.getReputation(address: ride.passenger!.address) {
                                passenger in
                                passengerRR = passenger
                            }
                        }
                    }, label: {
                        VStack{
                            HStack{
                                Text("New Ride").font(.headline).bold()
                                Image(systemName: "car")
                                
                                }
                            Text("View Details").font(.subheadline).bold()
                            ProgressView(value: webSocket.progress).tint(.white)
                        }
                        
                    }).background(.ultraThinMaterial)
                        
                }
                
                if webSocket.tempRide != nil {

                    VStack(){
                        HStack{
                            Spacer()
                            Text("Price").font(.title2).bold()
                            Text(" \(webSocket.tempRide!.price.description) cUSD").font(.subheadline).bold()
                            Spacer()
                        }
                        
                    
                        if  manager.route != nil && manager.driverRidePrice != nil {
                            HStack{
                                Spacer()
                                Text("Driver Price").font(.subheadline).bold()
                               
                                Text(" \(String(format: "%.2f",manager.driverRidePrice!)) cUSD").font(.subheadline).bold()
                                Spacer()
                                VStack{
                                    
                                    if checkPrice() {
                                        Text("Fair").font(.subheadline).bold()
                                        Image(systemName: "checkmark.circle.fill").foregroundColor(.green)
                                    }else{
                                        Text("Not Fair").font(.subheadline).bold()
                                        Image(systemName: "x.circle.fill").foregroundColor(.red)
                                    }
                                }
                                Spacer()
                            }
                            Divider()
                            HStack{
                                Text("Route").font(.title2).bold()
                                Text(" \(String(format: "%.0f",(manager.route!.distance * 3.28084) / 5280 )) Miles")
                                Text(" \(String(format: "%.0f",(manager.route!.expectedTravelTime / 60))) Mins ")
                            }
                            Divider()
                            if passengerRR != nil {
                            VStack(spacing: 10){
                                HStack{
                                    Text("Passenger").font(.title2).bold()
                                    NBRatingView(rating: passengerRR!.rating)
                                }
                                
                                    HStack{
                                        Text("Reputation \(passengerRR!.reputation)")
                                        Text("Total Rides \(passengerRR!.rideCount)")
                                    }
                                }

                            }
                    
                        }else{
                            Text("Calculating Route")
                            ProgressView().tint(.blue)
                        }
                        
                        HStack{
                            Button(action: {
                                // abort timer
                                webSocket.abortTimer = true
                                // Set new rides back to default
                                webSocket.tempRide = nil
                                webSocket.newAnnounceRide = nil
                                webSocket.showInterest = false
                                // remove all from mapview
                                rideService.removeAll = true

                            }, label: {
                                Text("Dismiss")
                            })
                            Button(action: {
                                webSocket.showInterest = false
                                webSocket.abortTimer = true
                                isLoading = true
                                rideService.acceptRide(rideId: webSocket.newAnnounceRide!.rideId) {
                                    result in
                                        
                                        rideService.driverState = .inRide
                                        webSocket.rideId = webSocket.newAnnounceRide!.rideId
                                        rideService.rideId =  webSocket.newAnnounceRide!.rideId
                                        // Set announced ride in nil
                                        webSocket.newAnnounceRide = nil
                                        webSocket.tempRide = nil
                                        // Dont accept new ride while in a ride
                                        webSocket.acceptingNewRides = false
                                        // false loading
                                        isLoading = false
                                    
                                }
                            }, label: {
                                Text("Accept")
                               
                            }).disabled(webSocket.progress == 0.0)
                        }
                        ProgressView(value: webSocket.progress).tint(.blue)
                    }.background(.ultraThinMaterial)
                        .cornerRadius(15)
                        .clipShape(Rectangle())
        
                }

              
            }

            }
        }.padding()
    }
}

struct ListingState_Previews: PreviewProvider {
    static var previews: some View {
        ListingState()
    }
}
