//
//  Canceled.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 11/1/22.
//

import SwiftUI

// MARK: Canceled
struct Canceled: View {
    
    @EnvironmentObject var rideService:RideService
    @EnvironmentObject var manager:LocationManager
    
    var body: some View {
        VStack{
            Spacer()
            HStack{
                Button(action: {
                    // Set ride varibles back to zero
                    rideService.showDropOnStart = false
                    rideService.showDropOnEnd = false
                    rideService.humanStartLocation = ""
                    rideService.humanEndLocation = ""
                    // Clean map view if annotations and routes
                    manager.clean = true
                    rideService.ride = Ride()
                    manager.cleanMapView()
                    rideService.passengerState = .noRide
                }, label: {
                    Text("Ride Canceled")
                })
            }
        }
    }
}

struct Canceled_Previews: PreviewProvider {
    static var previews: some View {
        Canceled()
    }
}
