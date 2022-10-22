//
//  Ride.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 9/14/22.
//

import SwiftUI
import CoreLocation
import MapKit


class Ride:ObservableObject{
    
    // Drop locations relative on screen
    @Published var startDropLocation:CGPoint? = nil
    @Published var showDropOnStart = false
    
    @Published var endDropLocation:CGPoint? = nil
    @Published var showDropOnEnd = false

    // Coords to human readable loc
    @State var humanStartLocation:String = ""
    @State var humanEndLocation:String = ""
    
    //
    @Published var startLocation:CLLocationCoordinate2D?
    @Published var endLocation:CLLocationCoordinate2D?
    
    @Published var isLoading = false
    @Published var error:ContractError? = nil
    
    private var rideId:String? = nil

    init() {
        //getActiveRide(address: WalletServices.shared.getWallet().address)
    }
    
    func setLocations(start:CLLocationCoordinate2D,end:CLLocationCoordinate2D){
        withAnimation {
            startLocation = start
            endLocation = end
        }
    }
    
    func getActiveRide(address:String) {
        print("Get Active Ride")
        isLoading = true
        // TODO this will need address parameter
        let params = [] as [AnyObject]
        ContractServices.shared.read(contractId: .RideManager, method: RideManagerMethods.getActiveRide.rawValue, parameters: params)
        {
            result in
            DispatchQueue.main.async { [unowned self] in
                
                switch(result) {
                    
                case .success(let value):
                    print(value)
                    //let rideId = value["0"]! as! String
                    //print(rideId)
   
                case .failure(let error):
                    self.error = ContractError(title: "Faild to get active rides", description: error.errorDescription)
                }
            }
        }
    }
    
    func getRide() {
        print("Getting ride by ride id")
        if rideId == nil {return}
        
        let params = [] as [AnyObject]
        
        ContractServices.shared.read(contractId: .RideManager, method: RideManagerMethods.getRide.rawValue, parameters: params)
        {
            result in
            DispatchQueue.main.async { [unowned self] in
                switch(result) {
                case .success(let value):
                    print(value)
                case .failure(let error):
                    self.error = ContractError(title: "Failed to get ride by ID", description: error.errorDescription)
                }
                
            }
        }
        
    }
    
    
    
}
