//
//  CryptoRide_PassengerApp.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 9/14/22.
//

import SwiftUI
import FirebaseCore
@main
struct CryptoRide_PassengerApp: App {
    @StateObject var authentication = Authentication()
    
    init() {
        // Configure firebase
        FirebaseApp.configure()
    }
    
    var body: some Scene {
        WindowGroup {
                    // check if we are validated
                    if authentication.isValidated {
                        ContentView(password: authentication.password).environmentObject(authentication)
                    }else {
                        LoginView().environmentObject(authentication)
                    }
                }
    }
}

