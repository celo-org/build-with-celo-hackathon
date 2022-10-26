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
            Image(systemName: "person.crop.circle").frame(width: 100, height: 100, alignment: .center)
                .scaledToFit()
            Text("Select Profile Picture")
            
            Text("Links Profiles").font(.title3)
       
            TextField("Twitter Handle",text: $profileVM.registerNewDriver.profile.twitterHandle).keyboardType(.twitter)
            TextField("Facebook Handle",text: $profileVM.registerNewDriver.profile.facebookHandle).keyboardType(.default)
            TextField("Instagram Handle",text: $profileVM.registerNewDriver.profile.instagramHandle).keyboardType(.default)
            Spacer()
        }.textFieldStyle(.roundedBorder)
            .disableAutocorrection(true)

    }
}

struct ProfileRegistration_Previews: PreviewProvider {
    static var previews: some View {
        ProfileRegistration()
    }
}
