//
//  Ride.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 9/14/22.
//

import SwiftUI
import Combine
import CoreLocation
import MapKit
import web3swift
import BigInt


struct Ride {
    var shared:Bool = false
    var startCoordinates:[BigUInt] = []
    var endCoordinates:[BigUInt] = []
    var price:BigUInt = 0
    var time:BigUInt = 0
    var acceptedDriver:EthereumAddress? = nil
    var passenger:EthereumAddress? = nil
    var rideState:BigUInt = 0
}

struct Coordinate {
    var lat:BigInt
    var long:BigInt
}


class RideService:ObservableObject{
    
    // Drop locations relative on mapView
    @Published var startDropLocation:CGPoint? = nil
    @Published var showDropOnStart = false
    
    @Published var endDropLocation:CGPoint? = nil
    @Published var showDropOnEnd = false

    // Coordinate points to human readable
    @State var humanStartLocation:String = ""
    @State var humanEndLocation:String = ""
    
    // Coordinate points
    @Published var startLocation:CLLocationCoordinate2D?
    @Published var endLocation:CLLocationCoordinate2D?
    
    @Published var isLoading = false
    @Published var error:ContractError? = nil
    
    @ObservedObject var webSocket = WebSockets()
    
    var rideId: AnyCancellable?
    
    @Published var ride:Ride? = nil

    init() {
        getActiveRide(address: WalletServices.shared.getWallet().address)
        
        rideId = objectWillChange.sink { value in
            print("newRideState \(value)")
        }
        
    }

    func getActiveRide(address:String) {
        isLoading = true
        // TODO this will need address parameter
        let params = [address] as [AnyObject]
        ContractServices.shared.read(contractId: .RideManager, method: RideManagerMethods.getActiveRide.rawValue, parameters: params)
        {
            result in
            DispatchQueue.main.async { [unowned self] in
                
                switch(result) {
                    
                case .success(let value):
                    let rideId = value["0"]! as! Data
                    //print(rideId.description)
                    let rideIdString = "0x" + rideId.bytes.toHexString()
                    webSocket.rideId = rideIdString
                    //self.rideId = rideIdString
                  
                    if !webSocket.rideId!.isEmpty {
                        getRide()
                    }
                        
                case .failure(let error):
                    self.error = ContractError(title: "Faild to get active rides", description: error.errorDescription)
                }
            }
        }
    }
    
    
    func getRide() {

        if webSocket.rideId == nil {return}
        
        let params = [webSocket.rideId] as [AnyObject]
        
        ContractServices.shared.read(contractId: .RideManager, method: RideManagerMethods.getRide.rawValue, parameters: params)
        {
            result in
            DispatchQueue.main.async { [unowned self] in
                switch(result) {
                case .success(let value):
                    let rideObject = value["0"] as! Array<Any>
                    
                    let shared = rideObject[0] as! Bool
                    let startCoordinates = rideObject[1] as! [BigUInt]
                    let endCoordinates =  rideObject[2] as! [BigUInt]
                    let price = rideObject[3] as! BigUInt
                    let time = rideObject[4] as! BigUInt
                    let acceptedDriver = rideObject[5] as! EthereumAddress
                    let passenger = rideObject[6] as! EthereumAddress
                    let rideState = rideObject[7] as! BigUInt
                    if(rideState == 0) {return}
                    self.ride = Ride(
                            shared: shared,
                            startCoordinates:startCoordinates,
                            endCoordinates: endCoordinates,
                            price: price,
                            time: time,
                            acceptedDriver: acceptedDriver,
                            passenger: passenger,
                            rideState: rideState
                    )
                    print(self.ride)
                    
                case .failure(let error):
                    self.error = ContractError(title: "Failed to get ride by ID", description: error.errorDescription)
                }
                
            }
        }
    }
    

    // MARK: FormateCoordinate
    /// Custom coordinate formate for soldity contracts
    ///
    /// First number represents how many positions the decimals sites
    /// Second number presents is point is negative
    ///             - 2 is negative
    ///             - 1 is positive
    /// - Parameters:
    ///         - `coordinates` CLLocationCoordinate2D location
    ///
    private func formatCoordinate(coordinates:CLLocationCoordinate2D) -> [Int] {
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
        // Insert decmial index at first index of string
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
    
    func setApproval(completion:@escaping(TransactionSendingResult) -> Void) {
        //let wei = Web3.Utils.formatToEthereumUnits("1", toUnits: .wei, decimals: 18, decimalSeparator: ".")!
        let wei = 100000000000000000
        let appoveAddress = [rideManagerAddress,wei] as [AnyObject]
        
        ContractServices.shared.write(contractId: .Token, method: RideManagerMethods.approve.rawValue, parameters:appoveAddress , password: "Password"){
            result in
            DispatchQueue.main.async { [unowned self] in
                 switch(result) {
                 case .success(let tx):
                     completion(tx)
                 case .failure(let error):
                     print(error)
                     self.error = ContractError(title: "Failed to announce ride", description: error.errorDescription)
                 }
         
             }
        }
        
    }
    
    func broadCastRide(startLocation:CLLocationCoordinate2D,endLocation:CLLocationCoordinate2D,driverlist:[String],ridePrice:Double) {
 
        let startCoords = formatCoordinate(coordinates: startLocation)
        let endCoords = formatCoordinate(coordinates: endLocation)
        
        
        //[37.35022091004023,  -122.00158516290249]
        //[37.306514947930125, -122.02955449841939]
        
        //[313735022091004023, 4212200158516290249]
        //[3137306514947930125,4212202955449841939]
        let wei = 100000000000000000
        //let wei = Web3.Utils.formatToEthereumUnits("100000000000000000", toUnits: .wei, decimals: 18, decimalSeparator: ".")!
        print(wei)
        let params = [startCoords,endCoords,driverlist,wei,false] as [AnyObject]
        
        
        ContractServices.shared.write(contractId: .RideManager, method: RideManagerMethods.announceRide.rawValue, parameters: params, password: "Password")
        {
            result in
           DispatchQueue.main.async { [unowned self] in
                switch(result) {
                case .success(let value):
                    self.ride = Ride(shared: false,
                                     startCoordinates: [BigUInt(startCoords[0]),BigUInt(startCoords[1])],
                                     endCoordinates: [BigUInt(endCoords[0]),BigUInt(endCoords[1])],
                                     price: BigUInt(wei),
                                     time: BigUInt(Date().timeIntervalSince1970),
                                     acceptedDriver: nil,
                                     passenger: EthereumAddress(WalletServices.shared.getWallet().address)!,
                                     rideState: BigUInt(1) // just announced ride
                    )
                case .failure(let error):
                    print(error)
                    self.error = ContractError(title: "Failed to announce ride", description: error.errorDescription)
                }
        
            }
        }
    }
    
    func cancelRide() {
        print("Canceling Ride")
        let params = [webSocket.rideId] as [AnyObject]
        ContractServices.shared.write(contractId: .RideManager, method: RideManagerMethods.cancelRide.rawValue, parameters: params, password: "Password")
        {
            result in
            DispatchQueue.main.async { [unowned self] in
                switch(result) {
                case .success(let value):
                    print(value)
                    
                    //TODO Check if ride was successfully canceled
                    // As for now we will set ride to nil
                    ride = nil
                case .failure(let error):
                    print(error)
                    self.error = ContractError(title: "Failed to announce ride", description: error.errorDescription)
                }
                
            }
        }
    }
    
    
    
}
