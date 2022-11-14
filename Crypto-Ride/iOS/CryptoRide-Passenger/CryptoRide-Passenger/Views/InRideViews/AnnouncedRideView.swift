//
//  AnnouncedRide.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 11/1/22.
//

import SwiftUI

// MARK: AnnouncedRideView
/// Presents when passenger builds and announces a ride onto the network
struct AnnouncedRideView: View {
    // Environment Object
    @EnvironmentObject var rideService:RideService
    @EnvironmentObject var webSocket:WebSockets
    @EnvironmentObject var manager:LocationManager
    
    var body: some View {
        VStack{
            HStack{Spacer()}
            if webSocket.progress != 0.0 {
                Text("Waiting for driver to accept ride")
                ProgressView(value: webSocket.progress).tint(.blue)
            }else if rideService.checkRideTime(numberOfDrivers: manager.drivers.count) {
                Text("No driver accepted ride.").font(.body).bold()
                Text("Cancel and try again").font(.body).bold()
            }else{
                ProgressView()
                Text("Waiting for event")
            }
        }.background(.bar)
    }
}

struct AnnouncedRideView_Previews: PreviewProvider {
    static var previews: some View {
        AnnouncedRideView()
    }
}
