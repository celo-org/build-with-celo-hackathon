//
//  LogDecoder.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/30/22.
//

import Foundation
import web3swift
import BigInt

class LogDecoder {
    

    static func decodeAnnoucedRide(data:String) -> AnnouncedRide {
        let hexString = data.dropFirst(2)
        let arrayValue = Array(hexString)

        let rideIdRange: ClosedRange = 0...63
        let valueRange: ClosedRange = 64...127
        let arrayCountRange: ClosedRange = 128...191
        //let addressOne: ClosedRange = 192...255
        //let addressTwo: ClosedRange = 256...319
        
        let rideId = String(arrayValue[rideIdRange])
        // Not sure what this value repsersents
        let valueId = String(arrayValue[valueRange])
       
        let arrayCount = String(arrayValue[arrayCountRange])
        //arrayCountValue.count
        let amount = Int(arrayCount)!
        
        var start = 192
        var end = 255
        var driverAddress:[EthereumAddress] = []
        for _ in 0...(amount - 1) {
            let addressRange: ClosedRange = start...end
            let bytes32Address = String(arrayValue[addressRange])
            
            // Hacky way to force a bytes32 to ethereum address
            let addressArray = Array(bytes32Address)
            let cutZero: ClosedRange = 24...63
            var address = String(addressArray[cutZero])
            address = "0x"+address
            driverAddress.append(EthereumAddress(address)!)
            
            start += 64
            end += 64
        }
        let announcedRide = AnnouncedRide(
            rideId: "0x" + rideId,
            valueId: valueId,
            addressCount: amount,
            driverAddress: driverAddress)
        return(announcedRide)
    }
    
}
