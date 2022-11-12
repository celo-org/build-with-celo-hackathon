//
//  Authentication.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 10/28/22.
//

import SwiftUI

// MARK: Authentication
/// Authentication object for login - out service
class Authentication:ObservableObject {
    @Published var isValidated = false
    var password = ""
    
    func updateValidation(success:Bool,password:String?) {
        withAnimation {
            isValidated = success
            self.password = password ?? ""
        }
    }
}


