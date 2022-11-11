//
//  ContractError.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/21/22.
//

import Foundation

// MARK: ContractError
/// Contract error used to consolidates different error types into singler error
struct ContractError:Error,LocalizedError,Identifiable {
    var id:String {description}
    let title:String
    let description:String
}
