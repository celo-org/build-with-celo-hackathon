//
//  Reputation.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 11/2/22.
//

import Foundation
import BigInt

class Reputation:ObservableObject {
    
    @Published var rating:Int = 0 // Assume rating is zero
    @Published var reputation:String = ""
    @Published var totalRating:String = ""
    @Published var rideCount:String = ""
    
    @Published var isLoading = false

    init() {
        // fetch on init
        getReputation()
    }
    
    // MARK: getReputation
    /// fetch reputation for wallet address
    /// Set data
    ///  - Rating
    ///  - Reputation
    ///  - Ride Count
    public func getReputation() {
        let ethAddress = ContractServices.shared.getWallet()
        let params = [ethAddress.address] as [AnyObject]
        
        ContractServices.shared.read(contractId:.RideManager, method:  RideManagerMethods.getReputation.rawValue, parameters: params) { result in
            DispatchQueue.main.async { [self] in
                isLoading = false
                switch(result) {
                case .success(let result):
                    let passengerRating = result["0"] as! Array<Any>
                    // Cast as bigUInt
                    let bigRating = passengerRating[0] as! BigUInt
                    let bigReputation = passengerRating[1] as! BigUInt
                    // Not sure what the second position 
                    let bigCount = passengerRating[3] as! BigUInt
                    // Int needed for rating view
                    rating = Int(bigRating)
                    // Only need the description of reputation and count
                    reputation = bigReputation.description
                    rideCount = bigCount.description
                  
                case .failure(let error):
                    print(error)
                }
            }
        }
    }

}
