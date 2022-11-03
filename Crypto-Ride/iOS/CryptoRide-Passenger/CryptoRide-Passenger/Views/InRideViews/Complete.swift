//
//  Complete.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 11/1/22.
//

import SwiftUI

struct Complete: View {
    
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
