//
//  ProfileView.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/21/22.
//

import SwiftUI

struct ProfileView: View {
    
    @State var rate:String = ""
    @StateObject var profileVM = ProfileViewModel()
    
    var body: some View {
        VStack{
            if profileVM.driverInfo != nil {
                Text("Current Rate: \(rate)")
                Text("Is Driver: \(profileVM.driverInfo!.isDriver!)" as String)
                Text("")
            }

            TextField("Rate",text: $rate).keyboardType(.decimalPad)
            Button {
                
            }label: {
                Text("Update Rate ")
            }
        }.textFieldStyle(.roundedBorder)

    }
}

struct ProfileView_Previews: PreviewProvider {
    static var previews: some View {
        ProfileView()
    }
}
