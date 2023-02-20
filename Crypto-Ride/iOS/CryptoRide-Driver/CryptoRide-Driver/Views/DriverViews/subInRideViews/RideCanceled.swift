//
//  RideCanceled.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/31/22.
//

import SwiftUI

struct RideCanceled: View {
    
    @EnvironmentObject var rideService:RideService
    @EnvironmentObject var webSocket:WebSockets
    @EnvironmentObject var manager:LocationManager
    
    var body: some View {
        Button(action: {
            rideService.ride.rideState = 0
            rideService.removeAll = true
            rideService.driverState = .noRide
            rideService.rideId = nil
            manager.isActive = true
            // Set listening to true
            webSocket.acceptingNewRides = true
        }, label: {
            Text("Ride was Canceled")
        })
    }
}

struct RideCanceled_Previews: PreviewProvider {
    static var previews: some View {
        RideCanceled()
    }
}
