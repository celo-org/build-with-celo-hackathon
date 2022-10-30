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


struct Coordinate {
    var lat:BigInt
    var long:BigInt
}



class RideService:ObservableObject{
    
    // Drop locations relative on mapView
    @Published var userLocation = false
    @Published var startDropLocation:CGPoint? = nil
    @Published var showDropOnStart = false
    
    @Published var endDropLocation:CGPoint? = nil
    @Published var showDropOnEnd = false

    // Coordinate points to human readable
    // Updated from MapView
    @Published var humanStartLocation:String = ""
    @Published var humanEndLocation:String = ""
    
    // Coordinate points
    @Published var startLocation:CLLocationCoordinate2D?
    @Published var endLocation:CLLocationCoordinate2D?
    
    @Published var isLoading = false
    @Published var error:ContractError? = nil
    
    @Published var rideId:String? = nil
    @Published var ride:Ride? = nil
    
    @Published var currentApprovedAmount:BigUInt? = nil

    init() {
        getActiveRide(address: ContractServices.shared.getWallet().address)
    }


    func getActiveRide(address:String) {
        isLoading = true
        let params = [address] as [AnyObject]
        ContractServices.shared.read(contractId: .RideManager, method: RideManagerMethods.getActiveRide.rawValue, parameters: params)
        {
            result in
            DispatchQueue.main.async { [unowned self] in
                
                switch(result) {
                    
                case .success(let value):
                    let rideIdRaw = value["0"]! as! Data
                    
                    // returns in bytes32
                    // cast to hexString add hex identifier
                    let rideIdString = "0x" + rideIdRaw.bytes.toHexString()
                    rideId = rideIdString
                    //print(rideId)
                    if !rideId!.isEmpty {
                        getRide()
                    }
                        
                case .failure(let error):
                    self.error = ContractError(title: "Faild to get active rides", description: error.errorDescription)
                }
            }
        }
    }
    
    
    func getRide() {

        if rideId == nil {return}
 
        let params = [rideId] as [AnyObject]
        
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
                    
                    ride = Ride(
                            shared: shared,
                            startCoordinates: startCoordinates,
                            endCoordinates: endCoordinates,
                            price: price,
                            time: time,
                            acceptedDriver: acceptedDriver,
                            passenger: passenger,
                            rideState: rideState
                    )

                    
                case .failure(let error):
                    self.error = ContractError(title: "Failed to get ride by ID", description: error.errorDescription)
                }
                
            }
        }
    }
    

    func getAllowance(address:String) {
        let params = [address,rideManagerAddress.address] as [AnyObject]
        ContractServices.shared.read(contractId: .Token, method: RideManagerMethods.allowance.rawValue, parameters: params)
        {
            result in
            switch(result) {
            case.success(let value):
                DispatchQueue.main.async { [unowned self] in
                    print(value)
                    currentApprovedAmount = value["0"] as! BigUInt
                }
            case .failure(let error):
                self.error = ContractError(title: "Failed to get Contract Allowance", description: error.errorDescription)
            }

        }
    }
    
    func setApproval(completion:@escaping(TransactionSendingResult) -> Void) {
        //let wei = Web3.Utils.formatToEthereumUnits("1", toUnits: .wei, decimals: 18, decimalSeparator: ".")!
        let wei = 100000000000000000
        let appoveAddress = [rideManagerAddress,wei] as [AnyObject]
        
        ContractServices.shared.write(contractId: .Token, method: RideManagerMethods.approve.rawValue, parameters:appoveAddress , password: ""){
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
    
    
    
    
    func broadCastRide(startLocation:CLLocationCoordinate2D,endLocation:CLLocationCoordinate2D,driverlist:[String],ridePrice:Double,completion:@escaping(TransactionSendingResult) -> Void) {
       
        
        //[37.35022091004023,  -122.00158516290249]
        //[37.306514947930125, -122.02955449841939]
        
        //[313735022091004023, 4212200158516290249]
        //[3137306514947930125,4212202955449841939]
        let startCoords =  ContractCoordinates.encodeCoordinate(coordinates: startLocation)
      
        let endCoords =  ContractCoordinates.encodeCoordinate(coordinates: endLocation)
    
        let wei = 100000000000000000
        //let wei = Web3.Utils.formatToEthereumUnits("100000000000000000", toUnits: .wei, decimals: 18, decimalSeparator: ".")!
    
        let params = [startCoords,endCoords,driverlist,wei,false] as [AnyObject]
        print(params)
        
        ContractServices.shared.write(contractId: .RideManager, method: RideManagerMethods.announceRide.rawValue, parameters: params, password: "")
        {
            result in
           DispatchQueue.main.async { [unowned self] in
                switch(result) {
                case .success(let tx):
                    // Quick way to move states, this needs to be checked if
                    self.ride = Ride(shared: false,
                                     startCoordinates: [BigUInt(startCoords[0]),BigUInt(startCoords[1])],
                                     endCoordinates: [BigUInt(endCoords[0]),BigUInt(endCoords[1])],
                                     price: BigUInt(wei),
                                     time: BigUInt(Date().timeIntervalSince1970),
                                     acceptedDriver: nil,
                                     passenger: EthereumAddress(ContractServices.shared.getWallet().address)!,
                                     rideState: BigUInt(1) // just announced ride
                    )
                    
                    completion(tx)
                case .failure(let error):
                    print(error)
                    self.error = ContractError(title: "Failed to announce ride", description: error.errorDescription)
                }
        
            }
        }
    }
    
    func acceptRide(rideId:String) {
        let params = [rideId] as [AnyObject]
        print(rideId)
        ContractServices.shared.write(contractId: .RideManager, method: RideManagerMethods.driverAcceptsRide.rawValue, parameters: params, password: "") {
            result in
            switch(result) {
            case .success(let value):
                print("Ride succcess")
                print(value)
            case .failure(let error):
                print(error)
                self.error = ContractError(title: "Failed to accpet ride", description: error.errorDescription)
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
    
    func passengerConfirmsDropOff() {
        let driverRating = 4
        let params = [rideId!,driverRating] as [AnyObject]
        ContractServices.shared.write(contractId: .RideManager, method: RideManagerMethods.passengerConfirmsDropOff.rawValue, parameters: params, password: ""){
            result in
            DispatchQueue.main.async { [unowned self] in
                switch(result){
                case .success(let value):
                    print(value)
                case .failure(let error):
                    print(error)
                    self.error = ContractError(title: "Failed for passenger to confirm dropOff", description: error.errorDescription)
                }
                
            }
        }
    }
    
    
    
    func cancelRide() {
        print("Canceling Ride")
        print(rideId)
        let params = [rideId] as [AnyObject]
        ContractServices.shared.write(contractId: .RideManager, method: RideManagerMethods.cancelRide.rawValue, parameters: params, password: "")
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
