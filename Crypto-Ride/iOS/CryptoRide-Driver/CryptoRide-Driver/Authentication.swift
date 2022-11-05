//
//  Authentication.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/23/22.
//

import SwiftUI

class Authentication:ObservableObject {
    @Published var isValidated = true
    
    
    func updateValidation(success:Bool) {
        withAnimation {
            isValidated = success
        }
    }
}
