//
//  ContractError.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/21/22.
//

import Foundation

struct ContractError:Error,LocalizedError,Identifiable {
    var id:String {description}
    let title:String
    let description:String
}
