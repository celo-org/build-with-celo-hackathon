//
//  Wallet.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/21/22.
//

import Foundation

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

