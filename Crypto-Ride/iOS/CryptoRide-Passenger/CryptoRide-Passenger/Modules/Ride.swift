//
//  Ride.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 11/1/22.
//

import Foundation
import web3swift
import MapKit
import BigInt

struct Ride {
    var shared:Bool = false
    var startCoordinates:CLLocationCoordinate2D? = nil
    var endCoordinates:CLLocationCoordinate2D? = nil
    var price:BigUInt = 0
    var time:BigUInt = 0
    var acceptedDriver:EthereumAddress? = nil
    var passenger:EthereumAddress? = nil
    var rideState:BigUInt = 0
}

enum RideState {
    case None
    case Announced
    case DriverAccepted
    case PassengerPickUp
    case DriverDropOff
    case Complete
    case Canceled
}
