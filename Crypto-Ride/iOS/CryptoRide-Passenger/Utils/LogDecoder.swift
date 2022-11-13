//
//  LogDecoder.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 11/6/22.
//

import Foundation
import web3swift
import BigInt

// MARK: LogDecoder
/// Static class decodes event logs emitted from smart contract
class LogDecoder {
    
    // MARK: decodeAnnoucedRide
    /// Slices a String Array from a event into variables of announcedRide class
    ///
    /// - Parameters:
    ///         - `data`string of ride details utf encoded
    /// - Returns:
    ///         - `AnnouncedRide` details of announced ride
    ///
    static func decodeAnnoucedRide(data:String) -> AnnouncedRide {
        // Drop hex identifier
        let hexString = data.dropFirst(2)
        let arrayValue = Array(hexString)
        // Range each fix data point
        // Eazy as each data point is 64 charaters `Bytes32`
        let rideIdRange: ClosedRange = 0...63
        let passengerRange: ClosedRange = 88...127
        let idkRange: ClosedRange = 128...191
        let driverRange: ClosedRange = 192...255
        
        // Ride id from rideIdRange
        let rideId = String(arrayValue[rideIdRange])
        
        // Passenger address from passenger range
        var passengerAddress = String(arrayValue[passengerRange])
        passengerAddress = "0x" + passengerAddress
        let passengerEthAddress = EthereumAddress(passengerAddress)!
        
        // Not sure what this value repsersents
        let valueId = String(arrayValue[idkRange])
        
        // Get driver count
        let driverCount = String(arrayValue[driverRange])
        let amount = Int(driverCount)!
        
        // First index range of driver address
        var start = 256
        var end = 319
        var driverAddress:[EthereumAddress] = []
        // Loop amount of drivers
        for _ in 0...(amount - 1) {
            let addressRange: ClosedRange = start...end
            let bytes32Address = String(arrayValue[addressRange])
            // Trim the first 25 chars from a bytes32
            let addressArray = Array(bytes32Address)
            let cutZero: ClosedRange = 24...63
            // Add hex idenfitier to satisfy ethereum address
            var address = String(addressArray[cutZero])
            address = "0x"+address
            driverAddress.append(EthereumAddress(address)!)
            // Add 64 bit to the index range
            start += 64
            end += 64
        }
        // return announced ride class
        let announcedRide = AnnouncedRide(
            rideId: "0x" + rideId,
            valueId: valueId,
            passengerAddress:passengerEthAddress,
            addressCount: amount,
            driverAddress: driverAddress)
        return(announcedRide)
    }
    
    // MARK: decodeRideId
    // Slices first 66 chars in given string as the rideId
    static func decodeRideId(data:String) -> String {
        let arrayValue = Array(data)
        let rideIdRange: ClosedRange = 0...65
        return(String(arrayValue[rideIdRange]))
    }
    
}
