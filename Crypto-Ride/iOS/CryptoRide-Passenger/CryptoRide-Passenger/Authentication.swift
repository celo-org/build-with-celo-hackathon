//
//  Authentication.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 10/28/22.
//

import SwiftUI

class Authentication:ObservableObject {
    @Published var isValidated = true
    var password = ""
    
    func updateValidation(success:Bool,password:String?) {
        withAnimation {
            isValidated = success
            self.password = password ?? ""
        }
    }
}


