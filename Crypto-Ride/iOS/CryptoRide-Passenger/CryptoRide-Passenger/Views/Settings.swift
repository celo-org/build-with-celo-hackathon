//
//  Settings.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 11/2/22.
//

import SwiftUI

// MARK: Settings
/// Currently passenger app dosen't have adjustable settings
struct Settings: View {
    var body: some View {
        NavigationView {
            List {
                HStack{
                    
                }
            }
            .navigationTitle("Settings")
        }
            //Button(action: {
                //driver.updateDriverFare(fare: driver.fare)
            //}, label: {
            //    Text("Update")
            //}).buttonStyle(.borderedProminent)
        }
}


struct Settings_Previews: PreviewProvider {
    static var previews: some View {
        Settings()
    }
}
