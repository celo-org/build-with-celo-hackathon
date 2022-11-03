//
//  Canceled.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 11/1/22.
//

import SwiftUI

struct Canceled: View {
    
    @EnvironmentObject var rideService:RideService
    @EnvironmentObject var manager:LocationManager
    
    var body: some View {
        VStack{
            Spacer()
            HStack{
                Button(action: {
                    manager.clean = true
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
