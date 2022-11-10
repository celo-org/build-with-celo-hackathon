//
//  ContractCoordinates.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 10/28/22.
//

import Foundation
import BigInt
import CoreLocation

class ContractCoordinates {
    
    // MARK: encodeCoordinate
    /// Custom coordinate formate for soldity contracts
    ///
    /// First number represents how many positions the decimals sites
    /// Second number represents is point is negative
    ///             - 2 is negative
    ///             - 1 is positive
    ///
    /// [37.35022091004023,  -122.00158516290249]
    /// [37.306514947930125, -122.02955449841939]
    ///
    /// [313735022091004023,  4212200158516290249]
    /// [3137306514947930125,4212202955449841939]
    ///
    /// - Parameters:
    ///         - `coordinates` CLLocationCoordinate2D coordinate points to encode
    ///
    static func encodeCoordinate(coordinates:CLLocationCoordinate2D) -> [Int] {
        let long = Double(coordinates.longitude)
        let lat = Double(coordinates.latitude)
        // Cast coords as strings
        var stringLong = String(long)
        var stringLat = String(lat)
        
        // Check if we have neg coord point
        if stringLong.contains("-") {
            // replace negative coord with 2
            stringLong = stringLong.replacingOccurrences(of: "-", with: "2", options: .literal, range: nil)
        }else{
            // insert 1 for positive coord point
            stringLong.insert("1",at: stringLong.startIndex)
        }
        
        
        if stringLat.contains("-") {
            stringLat = stringLat.replacingOccurrences(of: "-", with: "2", options: .literal, range: nil)
        }else{
            stringLat.insert("1", at: stringLat.startIndex)
        }

        // Get index of the decimal
        let rangeLong: Range<String.Index> = stringLong.range(of: ".")!
        let indexLong: Int = stringLong.distance(from: stringLong.startIndex, to: rangeLong.lowerBound)
        // Insert decmial index from start index of string
        stringLong.insert(contentsOf: String(indexLong), at: stringLong.startIndex)
        // Remove decimal point
        stringLong = stringLong.replacingOccurrences(of: ".", with: "", options: .literal, range: nil)
        
        
        let range: Range<String.Index> = stringLat.range(of: ".")!
        let index: Int = stringLat.distance(from: stringLat.startIndex, to: range.lowerBound)
        stringLat.insert(contentsOf: String(index), at: stringLat.startIndex)
        stringLat = stringLat.replacingOccurrences(of: ".", with: "", options: .literal, range: nil)
  

        let bigLat = BigInt(stringLat)!
        let bigLong = BigInt(stringLong)!
        
        return([Int(bigLat),Int(bigLong)])
    }
    
    
    
    // MARK: decodeCoordinate
    /// Custom coordinate formate for soldity contracts
    ///
    /// First number represents how many positions the decimals sites
    /// Second number presents is point is negative
    ///             - 2 is negative
    ///             - 1 is positive
    /// - Parameters:
    ///          - `coordinates` array of `BigUInt`as  encoded coordinate points
    ///
    static func decodeCoordinate(coordinates:[BigUInt]) -> CLLocationCoordinate2D {
        // arraify the BigUInt
        var seqLat = Array(coordinates[0].description)
        
        // get whole number count
        let latDecimalPoint = seqLat[0].wholeNumberValue
        
        // remove whole number count
        seqLat.remove(at:0)
        // insert decimal point
        seqLat.insert(".", at: latDecimalPoint!)
        // Replace index 1 with neg if value is two
        if seqLat[1] == "2" {
            seqLat[1] = "-"
        }else{
            // remove index
            seqLat.remove(at: 0)
        }

        var seqLong = Array(coordinates[1].description)
        let longDecimalPoint = seqLong[0].wholeNumberValue
        seqLong.remove(at: 0)
        seqLong.insert(".", at: longDecimalPoint!)

        if seqLong[0] == "2" {
            seqLong[0] = "-"
        }else{
            seqLong.remove(at: 0)
        }
        
        // Cast long and lat into strings
        let formatLong = String(seqLong)
        let formatLat = String(seqLat)
        
        return CLLocationCoordinate2D(latitude: CLLocationDegrees(formatLat)!, longitude: CLLocationDegrees(formatLong)!)
    }
}
