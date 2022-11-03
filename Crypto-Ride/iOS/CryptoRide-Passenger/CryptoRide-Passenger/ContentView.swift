//
//  ContentView.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 9/14/22.
//

import SwiftUI
import MapKit
import Combine

enum PassengerStates {
    case none
    case insignificantFunds
    case noRide
    case inRide
    case rideComplete // Passenger is entered a ride
}

struct ContentView: View {
    
    @EnvironmentObject var authentication:Authentication
    
    @ObservedObject var manager = LocationManager()
    
    @StateObject var balance = Balance()
    @StateObject var reputation = Reputation()
    
    @ObservedObject var rideService:RideService
    @ObservedObject var webSocket:WebSockets

    
    let mapView:MapView = MapView()

    
    init() {
        rideService = RideService()
        webSocket = WebSockets()

        rideService.observeState(propertyToObserve: webSocket.$rideState)
        rideService.observeRideId(propertyToObserve: webSocket.$rideId)
    }

    
    func textForState() -> String {
        switch(rideService.ride.rideState){
        case 1:
            return("Waiting for Driver to Accept")
        case 2:
            // Allows mapview to snap to driver who accepted the ride
            //manager.selectedDriver =
            //manager.selectedAnnotation = nil
            return("Confirm pickup")
        case 3:
            return("Waiting for driver to confirm drop off")
        case 4:
            return("Confirm drop Off")
        case 5:
            return("Ride was Complete")
        case 6:
            return("Ride Was Canceled")
        default:
            return("undefined ride state")
        }
    }
    

    func containedView() -> AnyView {
        switch rideService.passengerState {
        case .none:
            return AnyView(Text(""))
        case .insignificantFunds:
            return AnyView(Text("Need more money"))
        case .noRide:
            return AnyView(
                MainBuilder().environmentObject(rideService)
                    .environmentObject(manager)
                    .environmentObject(balance)
            )
        case .inRide:
            return AnyView(
                
                InRide().environmentObject(rideService)
                        .environmentObject(manager)
                        .environmentObject(webSocket)
                   
            )
        case .rideComplete:
            return AnyView(Text("Ride compelet"))
         }
    }
 
   
    var body: some View {
        
        NavigationView {
            ZStack{
                mapView
                    .environmentObject(rideService)
                    .environmentObject(manager)
                    .edgesIgnoringSafeArea(.all)
                ErrorView()
                    .environmentObject(rideService)
                containedView()
                
      
                /*
                if rideService.ride.rideState == 0 || rideService.ride.rideState == 5 || rideService.ride.rideState == 6 {
                    
                    MainBuilder().environmentObject(rideService)
                        .environmentObject(manager)
                        .environmentObject(balance)
                }
                
                // Check if ride is empty
                if rideService.ride.rideState != 0 {
                    
                    // Views for progressing or canceling a ride
                    VStack(alignment: .center){
                        // hide Cancel button if ride is over or was canceled
                        if rideService.ride.rideState != 6 || rideService.ride.rideState != 5{
                            HStack{
                                Button {
                                    manager.cleanMapView()
                                    rideService.humanStartLocation = ""
                                    rideService.humanEndLocation = ""
                                    rideService.cancelRide(){ success in
                                        rideService.ride.rideState = 0
                                    }
                                }label: {
                                    Text("Cancel Ride")
                                }.buttonStyle(.borderedProminent)
                                    .tint(.red)
                                Spacer()
                            }
                        }
                        Spacer()
                        
                        Button{
                            switch(rideService.ride.rideState){
                            case 1:
                                // Drivers accepts ride
             
                                break
                            case 2:
                                
                                print("Confirm pickup")
                                rideService.passengerConfirmsPickUp()
                                
                            case 3:
                                // Driver confirms dropoff
                                break
                            case 4:
                                print("Confirm drop Off")
                                
                                rideService.passengerConfirmsDropOff()
                            case 5:
                                // passenger confirms ride was completed
                                manager.cleanMapView()
                                rideService.humanStartLocation = ""
                                rideService.humanEndLocation = ""
                                rideService.ride.rideState = 0
                                //viewState = .buildingRide
                            case 6:
                                rideService.ride.rideState = 0
                                //viewState = .buildingRide
                            default:
                                break
                            }
                        }label: {
                            VStack{
                            // Show progressview when waiting for driver to accept ride and progress isnt over
                                if rideService.ride.rideState == 1 || webSocket.progress != 0.0{
                                    ProgressView(value: webSocket.progress).tint(.white)
                                }
                                Text(textForState())
                            }
                        }.buttonStyle(.borderedProminent)
                        
                    }
                }
                         
                }
                if rideService.isLoading {
                    // Loading view between in ride and creating a ride
                    ProgressView().tint(.red)
                }
                 */
            }.task {
                let passengerAddress = ContractServices.shared.getWallet().address
                rideService.getActiveRide(address: passengerAddress){
                    rideId in
                    if rideId == ZERO_BYTES {
                        rideService.passengerState = .noRide
                    }else{
                        webSocket.rideId = rideId
                        rideService.rideId = rideId

                        rideService.getRide(rideId: rideId) {
                            ride in
                            rideService.startAnnotation.coordinate = ride.startCoordinates!
                            rideService.endAnnotation.coordinate = ride.endCoordinates!
                            rideService.ride = ride
                            rideService.updateRoute = true
                            rideService.passengerState = .inRide
                        }
                       
                    }
                }
            }
            .buttonStyle(.borderedProminent)
                .safeAreaInset(edge: .top, content: {
                    Color.clear
                        .frame(height: 0)
                        .background(.bar)
                        .border(.black)
                })
            .navigationViewStyle(StackNavigationViewStyle())
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                        Button("Logout") {
                            //webSocket.disconnectSocket()
                            authentication.updateValidation(success: false)
                        }
                    }
                ToolbarItem(placement: .navigationBarTrailing) {
                    NavigationLink(destination: ProfileView()
                        .environmentObject(balance)
                        .environmentObject(reputation)
                    ){
                        Image(systemName: "person.crop.circle")
                    }
                }
    
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
