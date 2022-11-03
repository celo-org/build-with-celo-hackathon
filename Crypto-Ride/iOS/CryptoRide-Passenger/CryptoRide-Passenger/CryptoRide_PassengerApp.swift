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
        FirebaseApp.configure()
    }
    
    var body: some Scene {
        WindowGroup {
                    if authentication.isValidated {
                        ContentView().environmentObject(authentication)
                    }else {
                        LoginView().environmentObject(authentication)
                    }
                }
    }
}

