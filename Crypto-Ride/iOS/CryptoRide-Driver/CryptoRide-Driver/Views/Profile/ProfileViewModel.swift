//
//  ProfileViewModel.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/21/22.
//

import Foundation
import BigInt
import CoreImage.CIFilterBuiltins
import web3swift

struct DriverInfo {
    var address:String?
    var isDriver:Bool?
    var rate:BigUInt?
    var carAssetLink:String?
    var infoAssetLink:String?
}

struct Profile {
    var name = "Zuck Musk"
    //var profileImage = ""
    var twitterHandle = "@elonmusk"
    var instagramHandle = "@zuck"
}

struct Vehicle {
   // var vehicleImage = ""
    var year = "2020"
    var makeModel = "Tesla Model X"
    var color = "White"
    var seatNumber = 4
}

struct Rate{
    var fare = 20
}

struct RegisterDriver {
    var profile = Profile()
    var vehicle = Vehicle()
    var rate = Rate()
}

class ProfileViewModel:ObservableObject {
    
    @Published var driverInfo:DriverInfo?
    
    @Published var registerNewDriver = RegisterDriver()
    
    @Published var isLoading = false
    @Published var error:Error? = nil
    
    @Published var toAddress = ""
    @Published var amount = ""

    
    private let context = CIContext()
    private let filter = CIFilter.qrCodeGenerator()
    
    
    init() {
        getDriverRate()
        //getTokenBalance()
    }
    
    func generateQRCode(from string: String) -> UIImage {
            let data = Data(string.utf8)
            filter.setValue(data, forKey: "inputMessage")
            if let qrCodeImage = filter.outputImage {
                if let qrCodeCGImage = context.createCGImage(qrCodeImage, from: qrCodeImage.extent) {
                    return UIImage(cgImage: qrCodeCGImage)
                }
            }
            return UIImage(systemName: "xmark") ?? UIImage()
        }
    

    
    public func getDriverRate() {
        isLoading = true
        let ethAddress = ContractServices.shared.getWallet()
        
        let params = [ethAddress.address] as [AnyObject]
        
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
                
                    driverInfo = DriverInfo(
                        address: ethAddress.address,
                        isDriver: Bool(exactly: isDriver)!,
                        rate: rate,
                        carAssetLink: carAssetUrl,
                        infoAssetLink: infoAssetUrl)
                    
                case .failure(let error):
                    self.error = ContractError(title: "Failed to get driver rate.", description: error.errorDescription)
                }
            }
        }
    }
    
    
    public func registerDriver(rate:Int,name:String,car:String, completion:@escaping(TransactionSendingResult) -> Void) {
          
        let params = [rate,name,car] as [AnyObject]
            ContractServices.shared.write(contractId: .RideManager, method: "addDriver", parameters: params, password: "") { result in
                DispatchQueue.main.async { [unowned self] in
                    switch(result){
                    case .success(let result):
              
                        completion(result)
                    case .failure(let error):
                        print("error")
                        print(error)
                    }
            }
        }
            
    }
    
    
    func transfer(completion:@escaping(TransactionSendingResult) -> Void) {
        let amount = Web3.Utils.parseToBigUInt(amount, units: .eth)
        let ethAddress = EthereumAddress(toAddress)!
        let params = [ethAddress.address,amount] as [AnyObject]
        ContractServices.shared.write(contractId: .Token, method: "transfer", parameters: params, password: "") {
            result in
            DispatchQueue.main.async { [unowned self] in
                switch(result){
                case .success(let result):
                    completion(result)
                case .failure(let error):
                    print("error")
                    print(error)
                }
        }
        }
        
    }

    
}
