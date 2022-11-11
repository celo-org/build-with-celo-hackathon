//
//  DriverDetails.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/31/22.
//

import Foundation
import BigInt

// MARK: Driver
/// Manage driver details
/// - TODO:
///     - Use json decoder instead of force downcast
///     - Improve error handle
class Driver:ObservableObject {
    // Driver details
    @Published var name:String = ""
    @Published var car:String = ""
    @Published var fare:Int = 0
    
    @Published var twitter:String = ""
    @Published var instagram:String = ""
    // Driver rating and reputation
    @Published var rating:Int = 0 //  rating is zero
    @Published var reputation:String = ""
    @Published var totalRating:String = ""
    @Published var rideCount:String = ""
    
    // Loading and error
    @Published var isLoading = false
    @Published var error:Error? = nil

    @Published var password = ""

    init() {
        // get details and reputation
        getDriver()
        getReputation()
    }
    
    // MARK: getDriver
    /// Gets driver details from the ride manager contract
    public func getDriver() {
        isLoading = true
        let ethAddress = ContractServices.shared.getWallet()
        // pass driver wallet address as input
        let params = [ethAddress.address] as [AnyObject]
        // read from the ride manager contract with method and parameters
        ContractServices.shared.read(contractId:.RideManager, method: RideManagerMethods.getDriverRate.rawValue, parameters: params) { result in
            DispatchQueue.main.async { [self] in
                isLoading = false
                switch(result) {
                case .success(let result):
                    let driverObject = result["0"] as! Array<Any>
                    // Cast variables to respective type
                    let bigFare = driverObject[1] as! BigUInt
                    fare = Int(bigFare)
                    name =  driverObject[2] as! String
                    car =  driverObject[3] as! String
                    
                    let defaults = UserDefaults.standard
                    twitter = defaults.string(forKey: "twitter") ?? ""
                    instagram = defaults.string(forKey: "instagram") ?? ""
                    
                case .failure(let error):
                    self.error = error
                }
            }
        }
    }
    
    // MARK: getReputation
    /// Get driver reputation from the ride manager contract
    public func getReputation() {
        let ethAddress = ContractServices.shared.getWallet()
        let params = [ethAddress.address] as [AnyObject]
        
        ContractServices.shared.read(contractId:.RideManager, method:  RideManagerMethods.getReputation.rawValue, parameters: params) { result in
            DispatchQueue.main.async { [self] in
                isLoading = false
                switch(result) {
                case .success(let result):
                    let driverRating = result["0"] as! Array<Any>
                    
                    let bigRating = driverRating[0] as! BigUInt
                    let bigReputation = driverRating[1] as! BigUInt
                    //let bigTotalRating = driverRating[2] as! BigUInt
                    let bigCount = driverRating[3] as! BigUInt
                    // Set published variables 
                    // Int needed for rating view
                    rating = Int(bigRating)
                    // Only the description is need
                    reputation = bigReputation.description
                    rideCount = bigCount.description
                    
                case .failure(let error):
                    self.error = error
                }
            }
        }
    }
    
    // MARK: updateDriverFare
    /// Updates the fare price of a driver in the contract
    public func updateDriverFare(fare:Int,completion:@escaping(Bool) -> Void) {
        isLoading = true
        // Add new fare price to contract input
        let params = [fare] as [AnyObject]
        
        ContractServices.shared.write(contractId:.RideManager, method:  RideManagerMethods.updateRate.rawValue, parameters: params, password: password) { result in
            DispatchQueue.main.async { [self] in
                isLoading = false
                switch(result) {
                case .success(let result):
                    // Complete with bool
                    completion(true)
                case .failure(let error):
                    self.error = error
                }
            }
        }
    }
}
