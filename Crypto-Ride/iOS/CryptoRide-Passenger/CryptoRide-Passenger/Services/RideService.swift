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

// MARK: RideService
///
/// Responsable for maintaining and progressing the ride state
///
/// TODO:
///     - Optimize repetitive code
///     - Get TX conformation
///     - Save success TX to core data
///
class RideService:ObservableObject{
    
    // Drop locations relative on mapView
    // Do to the way swiftUI has no native MapKit bools
    // are needed to update the map View
    @Published var userLocation = false
    @Published var startDropLocation:CGPoint? = nil
    @Published var showDropOnStart = false
    
    @Published var endDropLocation:CGPoint? = nil
    @Published var showDropOnEnd = false
    
    // Update map route mapView
    @Published var updateRoute = false

    // Coordinate points to human readable
    // Updated from MapView
    @Published var humanStartLocation:String = ""
    @Published var humanEndLocation:String = ""
    
    // Coordinate points
    @Published var startLocation:CLLocationCoordinate2D?
    @Published var endLocation:CLLocationCoordinate2D?
    
    // Start End annotations
    var startAnnotation:MKPointAnnotation = MKPointAnnotation()
    var endAnnotation:MKPointAnnotation = MKPointAnnotation()

    @Published var error:ContractError? = nil
    
    // Ride details 
    @Published var rideId:String? = nil
    @Published var ride:Ride = Ride()
    
    // Passenger ride state
    @Published var passengerState = PassengerStates.none
    
    private let password:String
    
    // Observe changes in rideState in webSockets
    var stateObserver: AnyCancellable?
    func observeState(propertyToObserve: Published<Int>.Publisher) {
        stateObserver = propertyToObserve
            .sink {
                self.ride.rideState = BigUInt($0)
            }
    }
    
    // Observe changes to rideId in webSockets
    var rideIdObserver: AnyCancellable?
    func observeRideId(propertyToObserve: Published<String?>.Publisher) {
        rideIdObserver = propertyToObserve
            .sink {
                self.rideId = $0
            }
    }
    
    init(password:String){
        self.password = password
    }
    
    // MARK: checkRideTime
    /// Calcuates total wait time for annouced rides
    /// - Note: Each driver gets 30 seconds to accept a ride.
    ///
    /// - Parameters :
    ///                 - `numberOfDrivers` : Integer - number of drivers
    ///
    func checkRideTime(numberOfDrivers:Int) -> Bool {
        // Total wait time for passenger
        let totalAcceptanceTime = Int(ride.time) + Int(numberOfDrivers * 30)
        // Add drivers to time
        return totalAcceptanceTime < Int(Date().timeIntervalSince1970)
    }
    
    // MARK: getActiveRide
    /// Async method to fetch rideId from `rideManager` contract
    ///
    /// - Parameters:
    ///            - `address` string of ethereum address to get active ride
    ///
    func getActiveRide(address:String,completion:@escaping(String) -> Void) {
        let params = [address] as [AnyObject]
        // Contract services async read method
        ContractServices.shared.read(contractId: .RideManager, method: RideManagerMethods.getActiveRide.rawValue, parameters: params)
        {
            result in
            // Make changes to published variables from main thread
            DispatchQueue.main.async { [unowned self] in
                
                switch(result) {
                    
                case .success(let value):
                    let rideIdRaw = value["0"]! as! Data
                    
                    // Cast to hexString add hex identifier
                    let rideIdString = "0x" + rideIdRaw.bytes.toHexString()
                    completion(rideIdString)
                case .failure(let error):
                    // On failure set error variable
                    self.error = error
                }
            }
        }
    }
    
    // MARK: getRide
    /// Async method to fetch ride details from `rideManager` contract
    /// - Parameters:
    ///            - `RideId` string of ride Id
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
                    // Decode coordinates
                    let startCoordinates = ContractCoordinates.decodeCoordinate(coordinates: startCoordinatesRaw)
                    let endCoordinates = ContractCoordinates.decodeCoordinate(coordinates: endCoordinatesRaw)
                    // Ride variables
                    let price = rideObject[3] as! BigUInt
                    let time = rideObject[4] as! BigUInt
                    let acceptedDriver = rideObject[5] as! EthereumAddress
                    let passenger = rideObject[6] as! EthereumAddress
                    let rideState = rideObject[7] as! BigUInt
                    
                    // Set ride object
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
    
    
    
    // MARK: broadCastRide
    /// Async method to broadcast ride to `RideManager` contract
    ///
    /// - Note: For testing 0.1 cUSD is set for the ride price
    ///
    /// - Parameters:
    ///            - `startLocation` CLLocationCoordinate2D of start location of ride
    ///            - `endLocation` CLLocationCoordinate2D of end location of ride
    ///            - `driverList` Array of strings witch are the acceptable drivers for ride
    ///            - `ridePrice` Price of ride in decimal 18 formate
    ///
    func broadCastRide(startLocation:CLLocationCoordinate2D,endLocation:CLLocationCoordinate2D,driverlist:[String],ridePrice:BigUInt,completion:@escaping(TransactionSendingResult) -> Void) {
        // 0.1 cUSD in wei
        let price = 100000000000000000
        // Encode coordinates
        let startCoords =  ContractCoordinates.encodeCoordinate(coordinates: startLocation)
        let endCoords =  ContractCoordinates.encodeCoordinate(coordinates: endLocation)
        
        let params = [startCoords,endCoords,driverlist,price,false] as [AnyObject]
        
        
        ContractServices.shared.write(contractId: .RideManager, method: RideManagerMethods.announceRide.rawValue, parameters: params, password: password)
        {
            result in
           DispatchQueue.main.async { [unowned self] in
                switch(result) {
                case .success(let value):
                    // Set ride object if broadcast was successful
                    //
                    self.ride = Ride(shared: false,
                                    
                                     startCoordinates: startLocation,
                                     endCoordinates: endLocation,
                                     price: ridePrice,
                                     time: BigUInt(Date().timeIntervalSince1970),
                                     acceptedDriver: nil,
                                     passenger: EthereumAddress(ContractServices.shared.getWallet().address)!,
                                     rideState: BigUInt(1) // RideState to announced ride
                    )
                    completion(value)
                case .failure(let error):
                    self.error = error
                }
        
            }
        }
    }
    
    // MARK: passengerConfirmsPickUp
    /// Async method to change ride state to passenger confirms pick up  in`RideManager` contract
    ///
    /// - Returns: completion: `TransactionSendingResult` on success
    ///
    func passengerConfirmsPickUp(completion:@escaping(TransactionSendingResult) -> Void) {
        let params = [rideId!] as [AnyObject]
        
        ContractServices.shared.write(contractId: .RideManager, method: RideManagerMethods.passengerConfirmsPickUp.rawValue, parameters: params, password: password){
            result in
            DispatchQueue.main.async { [unowned self] in
                switch(result){
                case .success(let value):
                    print(value)
                    completion(value)
                case .failure(let error):
                    self.error = error

                }
                
            }
        }
    }
    
    // MARK: passengerConfirmsDropOff
    /// Async method to change ride state to passenger confirms drop off  in`RideManager` contract
    ///
    /// - Parameters:
    ///             - `rating` integer 1 - 5 rating for driver
    ///
    /// - Returns: completion: `TransactionSendingResult` on success
    ///
    func passengerConfirmsDropOff(rating:Int,completion:@escaping(TransactionSendingResult) -> Void)  {
 
        let params = [rideId!,rating] as [AnyObject]
        ContractServices.shared.write(contractId: .RideManager, method: RideManagerMethods.passengerConfirmsDropOff.rawValue, parameters: params, password: password){
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
        let params = [rideId!] as [AnyObject]
        ContractServices.shared.write(contractId: .RideManager, method: RideManagerMethods.cancelRide.rawValue, parameters: params, password: password)
        {
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
    
    
}
