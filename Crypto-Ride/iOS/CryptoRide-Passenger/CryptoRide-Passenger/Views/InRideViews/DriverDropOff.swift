//
//  DriverDropOff.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 11/1/22.
//

import SwiftUI

// MARK: DriverDropOff
struct DriverDropOff: View {
    var body: some View {
        VStack{
            Spacer()
            VStack{
                HStack{
                    Spacer()
                    Text("Current Task:").font(.title2).bold()
                    Text("Waiting for driver to confirm dropoff.").font(.headline).padding()
                    Spacer()
                    ProgressView().tint(.blue)
                }
            }.background(.bar)
                .padding()
                .cornerRadius(15)
        }
    }
}

struct DriverDropOff_Previews: PreviewProvider {
    static var previews: some View {
        DriverDropOff()
    }
}
