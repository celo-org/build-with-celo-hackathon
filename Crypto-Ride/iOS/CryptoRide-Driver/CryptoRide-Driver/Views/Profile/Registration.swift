//
//  Registration.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/30/22.
//

import SwiftUI

struct Registration: View {
    
    @EnvironmentObject var registered:Registered
    @EnvironmentObject var driver:Driver
    @EnvironmentObject var balance:Balance
    
    var body: some View {
        VStack{
            Text("Looks like this wallet hasn't been registered yet").font(.title3)
            // Sense we are navigating from this view driver is not registered
            NavigationLink(destination: ProfileView().environmentObject(registered)
                .environmentObject(driver)
                .environmentObject(balance)
            ){
                Image(systemName: "person.crop.circle")
                Text("Register Wallet")
            }
        }.background(.ultraThinMaterial)
        Spacer()
    }
}

struct Registration_Previews: PreviewProvider {
    static var previews: some View {
        Registration()
    }
}
