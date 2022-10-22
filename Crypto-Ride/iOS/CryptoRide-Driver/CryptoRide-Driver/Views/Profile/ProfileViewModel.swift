//
//  ProfileViewModel.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/21/22.
//

import Foundation
import BigInt

struct DriverInfo {
    var address:String?
    var isDriver:Bool?
    var rate:BigUInt?
    var carAssetLink:String?
    var infoAssetLink:String?
}

class ProfileViewModel:ObservableObject {
    
    //@Published var isDriver = false
    @Published var driverInfo:DriverInfo?
    @Published var isLoading = false
    @Published var error:Error? = nil
    
    
    
    init() {
        //isDriverRegistered()
        getDriverRate()
    }
    
    /*
    public func isDriverRegistered() {
        isLoading = true
        let walletAddress = WalletServices.shared.getWallet()
        let params = [walletAddress.address] as [AnyObject]
        
        ContractServices.shared.read(contractId: Contracts.RideManager, method: "isDriver", parameters    : params)
        { result in
            DispatchQueue.main.async { [self] in
                isLoading = false
                switch(result){
                case .success(let result):
                    let number = result["0"] as! NSNumber
                    print(number)
                    isDriver = Bool(exactly: number)!
                case .failure(let error):
                    self.error = ContractError(title: "Failed to get balance.", description: error.errorDescription)
                }
            }
        }
    }
    */
    
    public func getDriverRate() {
        isLoading = true
        let walletAddress = WalletServices.shared.getWallet()
        let params = [walletAddress.address] as [AnyObject]
        
        ContractServices.shared.read(contractId: Contracts.RideManager, method: "getDriverRate", parameters    : params)
        { result in
            DispatchQueue.main.async { [self] in
                isLoading = false
                switch(result){
                case .success(let result):
                    let rawRate = result["0"] as! [AnyObject]
                    
                    let isDriver = rawRate[0] as! NSNumber
                    
                    let rate = rawRate[1] as! BigUInt
                    let carAssetUrl = rawRate[2] as! String
                    let infoAssetUrl = rawRate[3] as! String
                
                    let driver = DriverInfo(
                        address: walletAddress.address,
                        isDriver: Bool(exactly: isDriver)!,
                        rate: rate,
                        carAssetLink: carAssetUrl,
                        infoAssetLink: infoAssetUrl)

                    driverInfo = driver
                    
                case .failure(let error):
                    self.error = ContractError(title: "Failed to get driver rate.", description: error.errorDescription)
                }
            }
        }
    }
    
    public func updateDriverRate() {
        
    }

    
}
