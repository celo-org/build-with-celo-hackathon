//
//  Methods.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/21/22.
//

import Foundation

enum CusdMethods:String {
    case balanceOf = "balanceOf"
}

enum RideManagerMethods:String {
    case getActiveRide = "getActiveRide"
    case getRide = "getRide"
    case driverTime = "driverTime"
    case isCanceled = "isCanceled"
    
    case announceRide = "announceRide"
    case driverAcceptsRide = "driverAcceptsRide"
    case passengerConfirmsPickUp = "passengerConfirmsPickUp"
    case driverConfirmsDropOff = "driverConfirmsDropOff"
    case passengerConfirmsDropOff = "passengerConfirmsDropOff"
    case cancelRide = "cancelRide"
    
    case getReputation = "getReputation"
    
    case setDriverWindow = "setDriverWindow"
    case pause = "pause"
    case unpause = "unpause"
    
    case isDriver = "isDriver"
    case getDriverRate = "getDriverRate"
    case addDriver = "addDriver"
    case removeDriver = "removeDriver"
    case updateRate = "updateRate"
    
    case approve = "approve"
}
