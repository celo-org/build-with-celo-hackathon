//
//  ProfileRegistration.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/23/22.
//

import SwiftUI

struct ProfileRegistration: View {
    
    // Could add more
    //@State var twitter = ""
    //@State var facebook = ""
    //@State var instagram = ""
    
    @EnvironmentObject var profileVM:ProfileViewModel
    
    var body: some View {
        VStack{
            Spacer()
            Image(systemName: "person.crop.circle")
                .resizable()
                .frame(width: 50.0, height: 50.0)
            
            Text("Links Profiles").font(.title3).bold()
            Section{
                TextField("Name",text: $profileVM.registerNewDriver.profile.name).keyboardType(.default)
            }
            Section{
                TextField("Twitter Handle",text: $profileVM.registerNewDriver.profile.twitterHandle).keyboardType(.twitter)
                TextField("Instagram Handle",text: $profileVM.registerNewDriver.profile.instagramHandle).keyboardType(.twitter)
    
            }


            Spacer()
        }.textFieldStyle(.roundedBorder)
            .disableAutocorrection(true)
            .padding()

    }
}

struct ProfileRegistration_Previews: PreviewProvider {
    static var previews: some View {
        ProfileRegistration()
    }
}
