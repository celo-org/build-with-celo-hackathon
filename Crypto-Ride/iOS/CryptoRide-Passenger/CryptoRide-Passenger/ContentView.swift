//
//  ContentView.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 9/14/22.
//

import SwiftUI
import MapKit
import Combine

// Passenger ride states
enum PassengerStates {
    case none
    case noRide
    case inRide
}

struct ContentView: View {
    
    @EnvironmentObject var authentication:Authentication
    
    @ObservedObject var balance:Balance
    @StateObject var reputation = Reputation()
    
    @ObservedObject var rideService:RideService
    @ObservedObject var webSocket:WebSockets
    @ObservedObject var manager = LocationManager()
    
    let mapView:MapView = MapView()


    init(password:String) {
        // Set up are Observed Objects
        rideService = RideService(password:password)
        webSocket = WebSockets()
        balance = Balance(password: password)
        rideService.observeState(propertyToObserve: webSocket.$rideState)
        rideService.observeRideId(propertyToObserve: webSocket.$rideId)

    }

    
    // MARK: containedView
    /// Jump between view based on passenger state
    func containedView() -> AnyView {
        switch rideService.passengerState {
        case .none:
            return AnyView(ProgressView())

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
                // IMPORTANT get ride state of passenger address
                // This will set the course for what view is presented
                let passengerAddress = ContractServices.shared.getWallet().address
                // Check if passenger address is in active ride
                rideService.getActiveRide(address: passengerAddress){
                    rideId in
                    if rideId == ZERO_BYTES {
                        rideService.passengerState = .noRide
                    }else{
                        webSocket.rideId = rideId
                        rideService.rideId = rideId
                        // Get details of the active ride
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
                        rideService.error = nil
                    })
            }
            .navigationTitle("Passenger")
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
