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
    
    var body: some View {
        Button(action: {
            // Change driver state to noride 
            rideService.driverState = .noRide
            rideService.removeAll = true
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
