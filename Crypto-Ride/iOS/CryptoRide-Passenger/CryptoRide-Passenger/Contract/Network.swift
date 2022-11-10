//
//  Network.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 10/13/22.
//

import Foundation
import BigInt

// Testnet settings
let alfajoresTestnet = Network(chainId: BigUInt(44787) , rpcEndpoint: "https://alfajores-forno.celo-testnet.org")

let webSocketURI = "wss://alfajores-forno.celo-testnet.org/ws"

struct Network {
    let chainId:BigUInt
    let rpcEndpoint:String
}
