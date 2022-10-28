//
//  RideOverView.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 9/15/22.
//

import Foundation
import SwiftUI


struct RideOverView:View {

    @EnvironmentObject var lm:LocationManager
    
    var body: some View {
        Text("Total Amount")
        Text("$ \(String(format: "%.0f", lm.normalizedPrice))")
        Stepper("Adjust your price", value: $lm.normalizedPrice, in: 0...130)
       
    }
    
}

struct RideOverView_Previews: PreviewProvider {
    static var previews: some View {
        RideOverView()
    }
}
