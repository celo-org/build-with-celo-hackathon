//
//  CarRegistration.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/23/22.
//

import SwiftUI

struct CarRegistration: View {
    
    
    @EnvironmentObject var profileVM:ProfileViewModel
    
    var body: some View {
        VStack{
            Spacer()
            Image(systemName: "car")
                .resizable()
                .frame(width: 50.0, height: 50.0)
                
            
            Text("Vehicle Description").font(.title3).bold()
            TextField("Year",text: $profileVM.registerNewDriver.vehicle.year).keyboardType(.default)
            TextField("Make Model",text: $profileVM.registerNewDriver.vehicle.makeModel).keyboardType(.default)
            TextField("Color",text: $profileVM.registerNewDriver.vehicle.color).keyboardType(.default)
            HStack{
                Text("Number Of Seats \(profileVM.registerNewDriver.vehicle.seatNumber)").font(.title2).bold()
                Stepper("", value:  $profileVM.registerNewDriver.vehicle.seatNumber, in: 2...6)
            }
            //TextField("Vehicle Type",text: $profileVM.registerNewDriver.vehicle.).keyboardType(.default)
            Spacer()
        }.textFieldStyle(.roundedBorder)
            .disableAutocorrection(true)
            .padding()
        

    }
}

struct CarRegistration_Previews: PreviewProvider {
    static var previews: some View {
        CarRegistration()
    }
}
