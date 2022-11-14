//
//  CryptoRide_DriverApp.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/21/22.
//

import SwiftUI
import FirebaseCore


@main
struct CryptoRide_DriverApp: App {
    @StateObject var authentication = Authentication()
    
    init(){
        FirebaseApp.configure()
    }
    
    var body: some Scene {
        WindowGroup {
                    if authentication.isValidated {
                        ContentView(password: authentication.password).environmentObject(authentication)
                    }else {
                        LoginView().environmentObject(authentication)
                    }
                }
    }
}
