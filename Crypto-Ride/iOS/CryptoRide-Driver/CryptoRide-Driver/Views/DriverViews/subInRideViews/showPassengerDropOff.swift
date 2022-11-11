//
//  showPassengerDropOff.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/31/22.
//

import SwiftUI

struct showPassengerDropOff: View {
    var body: some View {
        VStack{
            
            HStack{
                Spacer()
                Text("Current Task:").font(.title2).bold()
                Text("Waiting for Passenger to confirm drop off").font(.headline).padding()
                ProgressView().tint(.blue)
                Spacer()
            }
            
        }.background(.bar)
            .padding()
            .cornerRadius(15)
            .clipShape(Rectangle())
    }
}

struct showPassengerDropOff_Previews: PreviewProvider {
    static var previews: some View {
        showPassengerDropOff()
    }
}
