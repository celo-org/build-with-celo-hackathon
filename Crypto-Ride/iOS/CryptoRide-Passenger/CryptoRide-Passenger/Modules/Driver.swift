//
//  Driver.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 9/14/22.
//

import Foundation


struct DriverDetails {
    let address:String
    var rateAppliedToRide:Double?
}


struct Location:Codable{
    let long,lat:Double
}


struct DriverLocation:Codable {
    let driver:String
    let geoHash:String
    let lat,lng:Double
    let time:Date               // Last updated 
}
