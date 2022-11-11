//
//  RideService.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/25/22.
//

import Foundation
import SwiftUI
import Combine

import CoreLocation

import MapKit
import web3swift
import BigInt

struct Coordinate {
    var lat:BigInt
    var long:BigInt
}

struct Passenger {
    var rating:Int
    var reputation:String
    var rideCount:String
}

class RideService:ObservableObject{
    
    // Coordinate points to human readable
    @State var humanStartLocation:String = ""
    @State var humanEndLocation:String = ""
    
    // MapView commands
    @Published var updateRoute = false
    @Published var showPickUpRoute = false
    @Published var snapToRoute = false
    @Published var removePickUpRoute = false
    @Published var removeRoute = false
    @Published var removeAll = false
    
    // Pickup and dropOff Annoations
    @Published var startAnnotation:MKPointAnnotation = MKPointAnnotation()
    @Published var endAnnotation:MKPointAnnotation = MKPointAnnotation()
    
    // Errors
    @Published var error:ContractError? = nil
    
    // Ride details
    @Published var rideId:String?
    @Published var driverState:DriverStates = .none
    @Published var ride:Ride = Ride()
    // Driver rating
    @Published var driverRating = 0
    
    // Understand private only refers to var accessible only within class
    private var password:String
    
    // MARK: observeRideState
    /// Change `rideState` from new events from websockets
    var stateObserver: AnyCancellable?
    func observeRideState(propertyToObserve: Published<Int>.Publisher) {
        stateObserver = propertyToObserve
            .sink {
                self.ride.rideState = BigUInt($0)
                switch($0) {
                //case 1:
                //        self.removeAll = true
                case 2:
                        self.showPickUpRoute = true
                    break
                case 3:
                        self.removePickUpRoute = true
                    self.snapToRoute = true
                    break
                case 4:
                        self.removePickUpRoute = true
                        //self.removeRoute = true
                    break
                
                default:
                    break
                }
            }
    }
    
    init(password:String){
        self.password = password
    }
    
    // MARK: isDriver
    /// Async method to fetch ride details from `rideManager` contract
    /// - Parameters:
    ///            - `address` string of ethereum address to check if driver
    /// - Returns: completion: `Bool` on success
    ///
    func isDriver(address:String,completion:@escaping(Bool) -> Void) {
        let params = [address] as [AnyObject]
        
        ContractServices.shared.read(contractId: Contracts.RideManager, method: "isDriver", parameters : params)
        { result in
            DispatchQueue.main.async { [self] in
             
                switch(result){
                case .success(let result):
                    let number = result["0"] as! NSNumber
                    let isRegistered = Bool(exactly: number)!
                    completion(isRegistered)
                case .failure(let error):
                    self.error = error
                }
            }
        }
    }
    
    // MARK: getReputation
    /// Async method to fetch reputation for a given address in `rideManager` contract
    ///
    /// - Parameters:
    ///            - `address` string eth address to check for active ride
    ///
    /// - Returns: completion: `Passenger` on success
    ///
    public func getReputation(address:String,completion:@escaping(Passenger) -> Void) {
        let params = [address] as [AnyObject]
        
        ContractServices.shared.read(contractId:.RideManager, method:  RideManagerMethods.getReputation.rawValue, parameters: params) { result in
            DispatchQueue.main.async { [self] in
                switch(result) {
                case .success(let result):
                    let driverRating = result["0"] as! Array<Any>
                    
                    let bigRating = driverRating[0] as! BigUInt
                    let bigReputation = driverRating[1] as! BigUInt
                    //let bigTotalRating = driverRating[2] as! BigUInt
                    let bigCount = driverRating[3] as! BigUInt
                    // Int needed for rating view
                    let passenger = Passenger(rating: Int(bigRating), reputation: bigReputation.description, rideCount: bigCount.description)
                    completion(passenger)
                case .failure(let error):
                    self.error = error
                }
            }
        }
    }

    // MARK: getActiveRide
    /// Async method to fetch active ride for a given address in `rideManager` contract
    ///
    ///
    /// - Parameters:
    ///            - `address` string eth address to check for active ride
    ///
    /// - Returns: completion: `String` on success
    ///

    func getActiveRide(address:String,completion:@escaping(String) -> Void) {
 
        let params = [address] as [AnyObject]
        ContractServices.shared.read(contractId: .RideManager, method: RideManagerMethods.getActiveRide.rawValue, parameters: params)
        {
            result in
            DispatchQueue.main.async { [unowned self] in
                
                switch(result) {
                    
                case .success(let value):
                    let rideId = value["0"]! as! Data
                    // cast to hexString add hex identifier
                    let rideIdString = "0x" + rideId.bytes.toHexString()
                    // Complete with rideId
                    completion(rideIdString)
    
                case .failure(let error):
                    self.error = error
                }
            }
        }
    }
    
    
    // MARK: getRide
    /// Async method to get ride details from the `rideManager` contract
    ///
    /// - Parameters:
    ///            - `rideId`64 char long string of ride Id
    ///
    /// - Returns: completion: `Ride` on success
    ///
    func getRide(rideId:String,completion:@escaping(Ride) -> Void) {
        
        let params = [rideId] as [AnyObject]
        
        ContractServices.shared.read(contractId: .RideManager, method: RideManagerMethods.getRide.rawValue, parameters: params)
        {
            result in
            DispatchQueue.main.async { [unowned self] in
                switch(result) {
                case .success(let value):
                    let rideObject = value["0"] as! Array<Any>
                    
                    let shared = rideObject[0] as! Bool
                    let startCoordinatesRaw = rideObject[1] as! [BigUInt]
                    let endCoordinatesRaw =  rideObject[2] as! [BigUInt]
                    let startCoordinates = ContractCoordinates.decodeCoordinate(coordinates: startCoordinatesRaw)
                    let endCoordinates = ContractCoordinates.decodeCoordinate(coordinates: endCoordinatesRaw)
                    
                    let bigPrice = rideObject[3] as! BigUInt
                    let price = Web3.Utils.formatToEthereumUnits(bigPrice, toUnits: .eth, decimals: 3)!
                    
                    
                    let time = rideObject[4] as! BigUInt
                    let acceptedDriver = rideObject[5] as! EthereumAddress
                    let passenger = rideObject[6] as! EthereumAddress
                    let rideState = rideObject[7] as! BigUInt

                    let ride = Ride(
                            shared: shared,
                            startCoordinates: startCoordinates,
                            endCoordinates: endCoordinates,
                            price: price,
                            time: time,
                            acceptedDriver: acceptedDriver,
                            passenger: passenger,
                            rideState: rideState
                    )

                    completion(ride)
                case .failure(let error):
                    self.error = error
                }
                
            }
        }
    }
    
    
    // MARK: acceptRide
    /// Async method to change ride state to DriverAccepted  `rideManager` contract
    ///
    /// - Parameters:
    ///            - `rideId`  64 char long string of represents ride Id
    ///
    /// - Returns: completion: `TransactionSendingResult` on success
    ///
    func acceptRide(rideId:String,completion:@escaping(TransactionSendingResult) -> Void) {
        let params = [rideId] as [AnyObject]
        print(rideId)
        ContractServices.shared.write(contractId: .RideManager, method: RideManagerMethods.driverAcceptsRide.rawValue, parameters: params, password: password) {
            result in
            DispatchQueue.main.async { [unowned self] in
                switch(result) {
                case .success(let value):
                    completion(value)
                case .failure(let error):
                    self.error = error
                }
            }
        }
    }
    
    
    // MARK: driverConfirmsDropOff
    /// Async method to change ride state to driver confirms drop off in `RideManager` contract
    ///
    /// - Parameters:
    ///            - `passengerRating` Integer from 1-5 representing rating of passenger
    ///
    /// - Returns: completion: `TransactionSendingResult` on success
    ///
    func driverConfirmsDropOff(passengerRating:Int,completion:@escaping(TransactionSendingResult) -> Void) {
       
        let params = [rideId!,passengerRating] as [AnyObject]
        
        ContractServices.shared.write(contractId: .RideManager, method: RideManagerMethods.driverConfirmsDropOff.rawValue, parameters: params, password: password){
            result in
            DispatchQueue.main.async { [unowned self] in
                switch(result){
                case .success(let value):
                    completion(value)
                case .failure(let error):
                    self.error = error
                }
                
            }
        }
    }
    
    // MARK: cancelRide
    /// Async method to change ride state to canceled in`RideManager` contract
    ///
    /// - Returns: completion: `TransactionSendingResult` on success
    ///
    func cancelRide(completion:@escaping(TransactionSendingResult) -> Void) {
        let params = [rideId] as [AnyObject]
        ContractServices.shared.write(contractId: .RideManager, method: RideManagerMethods.cancelRide.rawValue, parameters: params, password: password)
        {
            result in
            DispatchQueue.main.async { [unowned self] in
                switch(result) {
                case .success(let value):
                    completion(value)
                case .failure(let error):
                    print(error)
                    self.error = error
                }
                
            }
        }
    }
    

}
