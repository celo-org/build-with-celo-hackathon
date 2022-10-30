//
//  Authentication.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 10/28/22.
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

