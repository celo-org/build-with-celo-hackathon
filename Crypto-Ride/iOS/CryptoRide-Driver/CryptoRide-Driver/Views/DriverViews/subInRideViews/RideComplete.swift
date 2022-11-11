//
//  RideComplete.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/31/22.
//

import SwiftUI

struct RideComplete: View {
    
    @EnvironmentObject var rideService:RideService
    @EnvironmentObject var webSocket:WebSockets
    @EnvironmentObject var manager:LocationManager
    
    var body: some View {
        Button(action: {
            // Change driver state to noride
            rideService.ride.rideState = 0
            rideService.driverState = .noRide
            rideService.removeAll = true
            rideService.rideId = nil
            manager.isActive = true
            webSocket.acceptingNewRides = true
        }, label: {
            Text("Ride Complete")
        }).buttonStyle(.borderedProminent)
            .padding()
       
    }
}

struct RideComplete_Previews: PreviewProvider {
    static var previews: some View {
        RideComplete()
    }
}
