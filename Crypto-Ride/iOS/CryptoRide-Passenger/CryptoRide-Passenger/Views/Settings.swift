//
//  Settings.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 11/2/22.
//

import SwiftUI

struct Settings: View {
    var body: some View {
        NavigationView {
            List {
                
                HStack{
                    //Text("$ \(String(driver.fare))").font(.title2).bold()
                    //Stepper("per hour", value:  $driver.fare, in: 18...100)
                    
                }
            }
            .navigationTitle("Settings")
        }
            Button(action: {
                //driver.updateDriverFare(fare: driver.fare)
            }, label: {
                Text("Update")
            }).buttonStyle(.borderedProminent)
        }
}


struct Settings_Previews: PreviewProvider {
    static var previews: some View {
        Settings()
    }
}
