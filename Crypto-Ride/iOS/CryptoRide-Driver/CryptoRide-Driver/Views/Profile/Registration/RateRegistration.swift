//
//  RateRegistration.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/23/22.
//

import SwiftUI

struct RateRegistration: View {
    
    //@State var driverRate = ""
    //@State var isRegisted = false
    
    @EnvironmentObject var profileVM:ProfileViewModel
    
    var body: some View {
        VStack{
            Spacer()
            Text("Set your rate").font(.title3)
            TextField("Rate",text: $profileVM.registerNewDriver.rate.rate).keyboardType(.decimalPad)
            Text("Set working radius")
            Spacer()
        }.textFieldStyle(.roundedBorder)
            .disableAutocorrection(true)

    }
}

struct RateRegistration_Previews: PreviewProvider {
    static var previews: some View {
        RateRegistration()
    }
}
