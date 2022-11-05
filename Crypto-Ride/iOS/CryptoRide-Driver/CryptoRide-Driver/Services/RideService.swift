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

class RideService:ObservableObject{
    

    // Coordinate points to human readable
    @State var humanStartLocation:String = ""
    @State var humanEndLocation:String = ""
    
    // Map View commands
    @Published var updateRoute = false
    @Published var showPickUpRoute = false
    @Published var snapToRoute = false
    
    @Published var removePickUpRoute = false
    @Published var removeRoute = false
    @Published var removeAll = false
    
    // Pickup and dropOff Annoations
    @Published var startAnnotation:MKPointAnnotation = MKPointAnnotation()
    @Published var endAnnotation:MKPointAnnotation = MKPointAnnotation()

    @Published var error:ContractError? = nil
    
    // Ride states
    @Published var rideId:String?
    //@Published var rideState:BigUInt?
    @Published var driverState:DriverStates = .none
    @Published var ride:Ride = Ride()
    
    @Published var driverRating = 0
    
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
                        self.removeRoute = true
                    break
                
                default:
                    break
                }
                //if $0 == 2{
                //    self.showPickUpRoute = true
                //    self.removeRoute = 1
                //}
                //if $0 == 4 {
                //    self.removePickUpRoute = true
                //    self.removeRoute = true
                //    self.removeRoute = 2
                //}
            }
    }
    
    
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
                    print(error)
                    self.error = ContractError(title: "Failed to get balance.", description: error.errorDescription)
                }
            }
        }
    }


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
                    completion(rideIdString)
    
                case .failure(let error):
                    self.error = ContractError(title: "Faild to get active rides", description: error.errorDescription)
                }
            }
        }
    }
    
    
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

                    // self.ride
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
                    self.error = ContractError(title: "Failed to get ride by ID", description: error.errorDescription)
                }
                
            }
        }
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
    
    
    func acceptRide(rideId:String,completion:@escaping(TransactionSendingResult) -> Void) {
        let params = [rideId] as [AnyObject]
        print(rideId)
        ContractServices.shared.write(contractId: .RideManager, method: RideManagerMethods.driverAcceptsRide.rawValue, parameters: params, password: "") {
            result in
            DispatchQueue.main.async { [unowned self] in
                switch(result) {
                case .success(let value):
                    completion(value)
                case .failure(let error):
                    print(error)
                    self.error = ContractError(title: "Failed to accpet ride", description: error.errorDescription)
                }
            }
        }
    }
    
    func passengerConfirmsPickUp() {
        let params = [rideId!] as [AnyObject]
        
        ContractServices.shared.write(contractId: .RideManager, method: RideManagerMethods.passengerConfirmsPickUp.rawValue, parameters: params, password: ""){
            result in
            DispatchQueue.main.async { [unowned self] in
                switch(result){
                case .success(let value):
                    print(value)
                case .failure(let error):
                    print(error)
                    self.error = ContractError(title: "Failed for passenger to confirm pickup", description: error.errorDescription)
                }
                
            }
        }
    }
    
    
    func driverConfirmsDropOff(passengerRating:Int,completion:@escaping(TransactionSendingResult) -> Void) {
        let params = [rideId!,passengerRating] as [AnyObject]
        
        ContractServices.shared.write(contractId: .RideManager, method: RideManagerMethods.driverConfirmsDropOff.rawValue, parameters: params, password: ""){
            result in
            DispatchQueue.main.async { [unowned self] in
                switch(result){
                case .success(let value):
                    completion(value)
                case .failure(let error):
                    self.error = ContractError(title: "Failed for driver to confirm dropOff", description: error.errorDescription)
                }
                
            }
        }
    }
    
    func cancelRide(completion:@escaping(TransactionSendingResult) -> Void) {

        let params = [rideId] as [AnyObject]
        ContractServices.shared.write(contractId: .RideManager, method: RideManagerMethods.cancelRide.rawValue, parameters: params, password: "")
        {
            result in
            DispatchQueue.main.async { [unowned self] in
                switch(result) {
                case .success(let value):
                    completion(value)
                    //self.ride = nil
                case .failure(let error):
                    print(error)
                    self.error = ContractError(title: "Failed to announce ride", description: error.errorDescription)
                }
                
            }
        }
    }
    

}
