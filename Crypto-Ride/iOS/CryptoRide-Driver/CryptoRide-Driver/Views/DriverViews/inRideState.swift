//
//  RideState.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/31/22.
//

import SwiftUI

class Rating:ObservableObject{
    @Published var driverRating = 3
}

struct inRideState: View {
    
    @EnvironmentObject var rideService:RideService
    @EnvironmentObject var webSockets:WebSockets
    @EnvironmentObject var manager:LocationManager
    
    @State var showCancel = true
    @State var isCancelingProgress = false
    
    @StateObject var rating = Rating()
    
    
    // MARK: nextStep
    /// Given the `rideState` returns next step
    func nextStep() -> AnyView {
        switch rideService.ride.rideState {
        case 0:
            return AnyView(ProgressView())
        case 1:
            return AnyView(Text("Announced"))
        case 2:
            // Map should show both routes
            return AnyView(showToPickUp(_coordinates: rideService.ride.startCoordinates!, _locationName: "Pick Up Passenger"))
        case 3:
            // Map should only single blue route
            return AnyView(
                showToDropOff(_coordinates: rideService.ride.endCoordinates!, _locationName: "Passenger DropOff")
                    .environmentObject(rating)
                    .environmentObject(rideService)
            )
        case 4:
            return AnyView(showPassengerDropOff().environmentObject(rideService))
        case 5:
            return AnyView(RideComplete()
                .environmentObject(rideService)
                .environmentObject(webSockets)
                .environmentObject(manager)
            )
        case 6:
            return AnyView(RideCanceled()
                .environmentObject(rideService)
                .environmentObject(webSockets)
                .environmentObject(manager)
            )
        default:
            return AnyView(Text("Unkown State"))
        }
    }
    
    var body: some View {
        VStack{
            
            HStack {
                if rideService.ride.rideState == 6 || rideService.ride.rideState == 5 {
                    
                }else{
                        
                    Button {
                        isCancelingProgress = true
                        rideService.cancelRide(){ result in
                            rideService.removeRoute = true
                            rideService.removePickUpRoute = true
                            // Wait for event
                        }
                    }label: {
                        Text("Cancel Ride")
                        ProgressView().disabled(isCancelingProgress).tint(.red)
                    }.buttonStyle(.borderedProminent)
                        .tint(.red)
                        .disabled(isCancelingProgress)
                    Spacer()
                }
            }
            Spacer()
            // Present the next ride step
            nextStep()
   
        }
    }
}

struct inRideState_Previews: PreviewProvider {
    static var previews: some View {
        inRideState()
    }
}
