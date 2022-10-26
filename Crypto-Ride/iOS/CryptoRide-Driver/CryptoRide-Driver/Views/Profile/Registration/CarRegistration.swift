//
//  CarRegistration.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/23/22.
//

import SwiftUI

struct CarRegistration: View {
    
    //@State var carMake = ""
    //@State var carColor = ""
    //@State var carNumberOfDoors = ""
    
    @EnvironmentObject var profileVM:ProfileViewModel
    
    var body: some View {
        VStack{
            Spacer()
            Image(systemName: "car").frame(width: 100, height: 100, alignment: .center)
                .scaledToFit()
                
            Text("Select Vehicle Image")
            
            Text("Vehicle Description")
            
            TextField("Make Model",text: $profileVM.registerNewDriver.vehicle.makeModel).keyboardType(.default)
            TextField("Color",text: $profileVM.registerNewDriver.vehicle.color).keyboardType(.default)
            TextField("Vehicle Type",text: $profileVM.registerNewDriver.vehicle.vehicleType).keyboardType(.default)
            Spacer()
        }.textFieldStyle(.roundedBorder)
            .disableAutocorrection(true)
        

    }
}

struct CarRegistration_Previews: PreviewProvider {
    static var previews: some View {
        CarRegistration()
    }
}
