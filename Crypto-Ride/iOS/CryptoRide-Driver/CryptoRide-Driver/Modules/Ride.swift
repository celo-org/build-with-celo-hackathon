//
//  Ride.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/30/22.
//

import Foundation
import web3swift
import MapKit
import BigInt

// MARK: RideState
/// Ride states within the smart contract
enum RideState {
    case None
    case Announced
    case DriverAccepted
    case PassengerPickUp
    case DriverDropOff
    case Complete
    case Canceled
}

// MARK: AnnouncedRide
struct AnnouncedRide {
    let rideId: String
    let valueId: String
    let passengerAddress:EthereumAddress
    let addressCount: Int
    let driverAddress:[EthereumAddress]
}

// MARK: Ride
struct Ride {
    var shared:Bool = false
    var startCoordinates:CLLocationCoordinate2D? = nil
    var endCoordinates:CLLocationCoordinate2D? = nil
    var price:String = ""
    var time:BigUInt = 0
    var acceptedDriver:EthereumAddress? = nil
    var passenger:EthereumAddress? = nil
    var rideState:BigUInt = 0
}


