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

    
    init(password:String) {
        rideService = RideService(password:password)
        webSocket = WebSockets()

        rideService.observeState(propertyToObserve: webSocket.$rideState)
        rideService.observeRideId(propertyToObserve: webSocket.$rideId)
    }

    

    func containedView() -> AnyView {
        switch rideService.passengerState {
        case .none:
            return AnyView(ProgressView())
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
               
                    .environmentObject(rideService)
                containedView()
             
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
            .alert(item:$rideService.error) { error in
                Alert(title: Text(error.title), message: Text(error.description), dismissButton: .cancel() {
                        print("Error")
                    })
            }
            .navigationViewStyle(StackNavigationViewStyle())
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                        Button("Logout") {
                            //webSocket.disconnectSocket()
                            authentication.updateValidation(success: false,password:nil)
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
        ContentView(password: "")
    }
}
