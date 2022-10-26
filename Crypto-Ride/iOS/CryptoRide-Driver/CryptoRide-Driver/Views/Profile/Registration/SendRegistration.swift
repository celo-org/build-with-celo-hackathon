//
//  SendRegistration.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/24/22.
//

import SwiftUI

struct SendRegistration: View {
    @EnvironmentObject var profileVM:ProfileViewModel
    
    var body: some View {
        VStack{
            Text("send")
        }
    }
}

struct SendRegistration_Previews: PreviewProvider {
    static var previews: some View {
        SendRegistration()
    }
}
