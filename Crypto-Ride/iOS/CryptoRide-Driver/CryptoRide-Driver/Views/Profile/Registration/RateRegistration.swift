//
//  RateRegistration.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/23/22.
//

import SwiftUI

struct RateRegistration: View {
    
    @EnvironmentObject var profileVM:ProfileViewModel
    
    var body: some View {
        VStack{
            Spacer()
            Text("Set your fare price.").font(.title3).bold()
            HStack{
                Text("$ \(profileVM.registerNewDriver.rate.fare)").font(.title2).bold()
                Stepper("per hour", value:  $profileVM.registerNewDriver.rate.fare, in: 18...100)
            }
            Spacer()
        }.textFieldStyle(.roundedBorder)
            .disableAutocorrection(true)
            .padding()

    }
}

struct RateRegistration_Previews: PreviewProvider {
    static var previews: some View {
        RateRegistration()
    }
}
