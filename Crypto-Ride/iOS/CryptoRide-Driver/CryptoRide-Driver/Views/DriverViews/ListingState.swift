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
    
    // Temp ride object when selected annouced ride
    //@State var tempRide:Ride? = nil
    //@State var showInterest = false
    @State var isLoading = false
    
    
    //State var driverActive = false
    
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
                        Text("Stop")
                    }else{
                        Text("Start")
                    }
                    
                })
            }

            Spacer()
            if isLoading {
                ProgressView().tint(.blue)
            }else{
                
            
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

                    
                    VStack{
                        Text("Price \(webSocket.tempRide!.price.description) cUSD")
                        Text("Time \(webSocket.tempRide!.time.description)")
                        Text("Ride Pool \(webSocket.tempRide!.shared.description)")
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
        
                }

              
            }
                if webSocket.wasAcceptedByDriver {
                    Button(action: {
                        rideService.removeAll = true
                        webSocket.wasAcceptedByDriver = false
                        webSocket.showInterest = false
                    }, label: {
                        Text("Ride excepted by another driver")
                    })
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
