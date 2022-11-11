//
//  Settings.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/31/22.
//

import SwiftUI

struct Settings: View {
    
    @EnvironmentObject var registered:Registered
    @EnvironmentObject var balance:Balance
    @EnvironmentObject var driver:Driver
    
    @State var isLoading = false
    
    
    var body: some View {
        VStack{
        NavigationView {
            List {
                
                HStack{
                    Text("$ \(String(driver.fare))").font(.title2).bold()
                    Stepper("per hour", value:  $driver.fare, in: 18...100)
                }
                
                Text(driver.name)
                Text(driver.car)
                
                TextField("Twitter Handle",text: $driver.twitter).keyboardType(.twitter)
                TextField("Instagram Handle",text: $driver.instagram).keyboardType(.twitter)
            }
            .navigationTitle("Settings")
        }
            VStack{
                SecureField("Wallet Password", text: $driver.password)
                    .multilineTextAlignment(.center) 
                    .textFieldStyle(.roundedBorder)
                if !isLoading {
                    Button(action: {
                        isLoading = true
                        // Update the driver fare price in the smart contract
                        driver.updateDriverFare(fare: driver.fare){
                            result in
                            isLoading = false
                        }
                        
                        let defaults = UserDefaults.standard
                        defaults.set(driver.twitter, forKey: "twitter")
                        defaults.set(driver.instagram, forKey: "instagram")
                        
                    }, label: {
                        Text("Update")
                    }).buttonStyle(.borderedProminent)
                        .disabled(driver.password.isEmpty)
                } else {
                    ProgressView().tint(.blue)
                }
            }
        }
    }
}

struct Settings_Previews: PreviewProvider {
    static var previews: some View {
        Settings()
    }
}
