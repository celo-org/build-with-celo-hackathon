//
//  NoneView.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 11/2/22.
//

import SwiftUI

struct ErrorView: View {
    
    @EnvironmentObject var rideService:RideService

    var body: some View {
        if rideService.error != nil {
            VStack{
                HStack {
                    Text(rideService.error!.localizedDescription)
                }
                Button(action: {
                    rideService.error = nil
                }, label: {
                    Text("Dimiss")
                })
            }.padding()
                .background(.bar)
            Spacer()
        }
    }
}

struct NoneView_Previews: PreviewProvider {
    static var previews: some View {
        ErrorView()
    }
}
