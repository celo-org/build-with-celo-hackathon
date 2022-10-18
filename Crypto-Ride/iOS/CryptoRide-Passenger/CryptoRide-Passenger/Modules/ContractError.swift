//
//  ContractError.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 10/17/22.
//

import Foundation

struct ContractError:Error,LocalizedError,Identifiable {
    var id:String {description}
    let title:String
    let description:String
}
