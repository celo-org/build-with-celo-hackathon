//
//  AnnouncedRide.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 11/1/22.
//

import SwiftUI

struct AnnouncedRide: View {
    
    @EnvironmentObject var rideService:RideService
    @EnvironmentObject var webSocket:WebSockets
    
    var body: some View {
        VStack{
            HStack{Spacer()}
            if webSocket.progress != 0.0{
                Text("Waiting for driver to accept ride")
                ProgressView(value: webSocket.progress).tint(.blue)
            }else if rideService.checkRideTime() {
                Text("No driver accepted ride").font(.body).bold()
                Text("Cancel and try again").font(.body).bold()
            }
        }.background(.bar)
    }
}

struct AnnouncedRide_Previews: PreviewProvider {
    static var previews: some View {
        AnnouncedRide()
    }
}
