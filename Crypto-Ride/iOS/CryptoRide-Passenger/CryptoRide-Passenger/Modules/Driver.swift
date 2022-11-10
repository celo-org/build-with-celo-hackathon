//
//  Driver.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 9/14/22.
//

import Foundation
import BigInt

// Driver Objects

// MARK: DriverInfo
struct DriverInfo {
    var address:String?
    var isDriver:Bool?
    var rate:BigUInt?
    var carAssetLink:String?
    var infoAssetLink:String?
    var twitterHandle:String?
    var facebookHandle:String?
}

// MARK: Stats
struct Stats {
    var rating:Int?
    var reputation:BigUInt?
    var totalRating:BigUInt?
    var count:BigUInt?
}

// MARK: DriverDetails
struct DriverDetails {
    let address:String
    var rateAppliedToRide:Double = 0.0
    var info:DriverInfo?
    var stats:Stats?
}

// MARK: Location
struct Location:Codable{
    let long,lat:Double
}

// MARK: DriverLocation
struct DriverLocation:Codable {
    let driver:String
    let geoHash:String
    let lat,lng:Double
    let time:Date               // Last updated
    
}
