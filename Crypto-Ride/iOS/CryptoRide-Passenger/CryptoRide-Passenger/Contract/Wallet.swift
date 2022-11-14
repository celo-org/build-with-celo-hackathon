//
//  Wallet.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 10/14/22.
//

import Foundation

// More info here https://github.com/skywinder/web3swift#documentation
// Wallet struct
struct Wallet {
    let address: String
    let data: Data
    let name:String
    let isHD:Bool
}


struct HDKey {
    let name:String?
    let address:String
}
