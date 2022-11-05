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
    
    var body: some View {
        Button(action: {
            rideService.removeAll = true
            rideService.driverState = .noRide
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
