//
//  Events.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/24/22.
//

import Foundation

enum Topics:String {
    case cancelRide = "0xb10228717d68529db945de6fbc8d5ae6093d7aed82d5fde8801ab3c11666bbbe"
    case announceRide = "0x28529123910023eae6715104247d8e3a0307a4128b1b7c2314ed1c0b1e3cebdd"
    case driverAcceptsRide = "0x851b2f38815dced7e472b8a262ec36d869d2883904ce149c1762222d5fce669f"
    case passengerConfirmsPickUp = "0x07e38403477f7408b8004e87f9a9fd5a0f399b95ad9b63dd8848510b9da518a1"
    case driverConfirmsDropOff = "0x93e53cee153924a586890de75d639d5f155e158db26d45d993a0a79135e048a6"
    case complete = "0xe3013120a51c346041bad9eb238d169bd619d1121f2fe215331262467cbd137e"
}
