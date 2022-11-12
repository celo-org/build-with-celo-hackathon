//
//  Registered.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/31/22.
//

import SwiftUI

// MARK: Registered
///  Registration Observable 
class Registered:ObservableObject {
    @Published var isRegistered:Bool? = nil
    
    func updateRegistered(success:Bool) {
        withAnimation {
            isRegistered = success
        }
    }
}
