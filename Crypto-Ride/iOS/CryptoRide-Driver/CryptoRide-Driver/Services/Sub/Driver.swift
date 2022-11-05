//
//  DriverDetails.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/31/22.
//

import Foundation
import BigInt

class Driver:ObservableObject {
    @Published var name:String = ""
    @Published var car:String = ""
    @Published var fare:Int = 0
    
    @Published var twitter:String = ""
    @Published var instagram:String = ""
    
    @Published var rating:Int = 0 //  rating is zero
    @Published var reputation:String = ""
    @Published var totalRating:String = ""
    @Published var rideCount:String = ""
    
    @Published var isLoading = false
    

    init() {
        getDriver()
        getReputation()
    }
    
    public func getDriver() {
        isLoading = true
        let ethAddress = ContractServices.shared.getWallet()
        let params = [ethAddress.address] as [AnyObject]
        
        ContractServices.shared.read(contractId:.RideManager, method: RideManagerMethods.getDriverRate.rawValue, parameters: params) { result in
            DispatchQueue.main.async { [self] in
                isLoading = false
                switch(result) {
                case .success(let result):
                    let driverObject = result["0"] as! Array<Any>
                    
                    let bigFare = driverObject[1] as! BigUInt
                    fare = Int(bigFare)
                    name =  driverObject[2] as! String
                    car =  driverObject[3] as! String
                    
                    let defaults = UserDefaults.standard
                    twitter = defaults.string(forKey: "twitter") ?? ""
                    instagram = defaults.string(forKey: "instagram") ?? ""
                    
            
                case .failure(let error):
                    print(error)
                }
            }
        }
    }
    
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
                    // Int needed for rating view
                    rating = Int(bigRating)
                    // Strings
                    reputation = bigReputation.description
                    rideCount = bigCount.description
                    
                case .failure(let error):
                    print(error)
                }
            }
        }
    }
    
    public func updateDriverFare(fare:Int,completion:@escaping(Bool) -> Void) {
        isLoading = true

        let params = [fare] as [AnyObject]
        
        ContractServices.shared.read(contractId:.RideManager, method:  RideManagerMethods.updateRate.rawValue, parameters: params) { result in
            DispatchQueue.main.async { [self] in
                isLoading = false
                switch(result) {
                case .success(let result):
                    completion(true)
                case .failure(let error):
                    completion(false)
                }
            }
        }
    }
}
