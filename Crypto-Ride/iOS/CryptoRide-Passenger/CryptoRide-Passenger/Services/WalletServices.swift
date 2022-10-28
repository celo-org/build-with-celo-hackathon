//
//  WalletServices.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 10/17/22.
//

import Foundation
import web3swift

class WalletServices {
    static let shared = WalletServices()
    
    public func getWallet() -> Wallet {
        let keystore = try! EthereumKeystoreV3(privateKey: Data(hex:"<PRIVATEKEY>"), password: "Password")!

        let keyData = try! JSONEncoder().encode(keystore.keystoreParams);
        
        let address = keystore.addresses!.first!.address
        return  Wallet(address: address, data: keyData, name: "Passenger", isHD: false)
    }
    
}
