//
//  Complete.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 11/1/22.
//

import SwiftUI
// MARK: Complete
struct Complete: View {
    
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
                    rideService.rideId = nil
                    manager.cleanMapView()
                    rideService.passengerState = .noRide
                    
                }, label: {
                    Text("Ride Complete")
                })
            }
        }
    }
}

struct Complete_Previews: PreviewProvider {
    static var previews: some View {
        Complete()
    }
}
