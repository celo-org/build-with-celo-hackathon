//
//  Registered.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/31/22.
//

import SwiftUI

class Registered:ObservableObject {
    @Published var isRegistered = false
    
    func updateRegistered(success:Bool) {
        withAnimation {
            isRegistered = success
        }
    }
}
