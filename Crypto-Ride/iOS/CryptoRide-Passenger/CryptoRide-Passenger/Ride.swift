//
//  Ride.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 9/14/22.
//

import SwiftUI
import CoreLocation

class Ride:ObservableObject{
    
    @Published var startLocation:CLLocationCoordinate2D?
    @Published var endLocation:CLLocationCoordinate2D?
    @Published var isLoading = false
    @Published var error:ContractError? = nil

    //let driverRate = 23.00
    init() {
        getActiveRide()
    }
    
    func setLocations(start:CLLocationCoordinate2D,end:CLLocationCoordinate2D){
        withAnimation {
            startLocation = start
            endLocation = end
        }
    }
    
    func getActiveRide() {
        isLoading = true
        let wallet = WalletServices.shared.getWallet().address
        let params = [] as [AnyObject]
        
        ContractServices.shared.read(contractId: .RideManager, method: RideManagerMethods.getActiveRide.rawValue, parameters: params)
        {
            result in
            DispatchQueue.main.async { [unowned self] in
                
                switch(result) {
                    
                case .success(let value):
                    let rideId = value["0"]! as! String
                    print(rideId)
                    
                    //fetchGroups()
                case .failure(let error):
                    self.error = ContractError(title: "Faild to get active rides", description: error.errorDescription)
                }
            }
        }
    }
    
}
