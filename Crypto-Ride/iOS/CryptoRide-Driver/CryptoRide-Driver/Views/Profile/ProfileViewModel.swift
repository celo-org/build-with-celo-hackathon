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
    var profileImage = ""
    var twitterHandle = ""
    var facebookHandle = ""
    var instagramHandle = ""
}

struct Vehicle {
    var vehicleImage = ""
    var makeModel = ""
    var color = ""
    var vehicleType = ""
}

struct Rate{
    var rate = ""
    var location = ""
}

struct RegisterDriver {
    var profile = Profile()
    var vehicle = Vehicle()
    var rate = Rate()
}

class ProfileViewModel:ObservableObject {
    
    //@Published var isDriver = false
    @Published var driverInfo:DriverInfo?
    
    @Published var registerNewDriver = RegisterDriver()
    
    @Published var isLoading = false
    @Published var error:Error? = nil
    
    @Published var balance = ""
    
    private let context = CIContext()
    private let filter = CIFilter.qrCodeGenerator()
    
    
    init() {
        getDriverRate()
        getTokenBalance()
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
    
    public func getTokenBalance() {
        isLoading = true
        let ethAddress = ContractServices.shared.getWallet()
        let params = [ethAddress.address] as [AnyObject]
        
        ContractServices.shared.read(contractId:.Token, method:  CusdMethods.balanceOf.rawValue, parameters: params) { result in
            DispatchQueue.main.async { [self] in
                isLoading = false
                switch(result) {
                case .success(let result):
                    let rawBalance = result["balance"] as! BigUInt
                    balance = Web3.Utils.formatToEthereumUnits(rawBalance, toUnits: .eth, decimals: 3)!
                    
                case .failure(let error):
                    print(error)
                }
            }
        }
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
                
                    let driver = DriverInfo(
                        address: ethAddress.address,
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
    
    
    public func registerDriver( completion:@escaping(TransactionSendingResult) -> Void) {
          
        let params = [21,"car","profile"] as [AnyObject]
                ContractServices.shared.write(contractId: .RideManager, method: "addDriver", parameters: params, password: "") { result in
                    DispatchQueue.main.async { [unowned self] in
                        switch(result){
                        case .success(let result):
                            print("Success")
                            print(result)
                            
                        case .failure(let error):
                            print("error")
                            print(error)
                        }
                }
        }
            
    }
    
    public func updateDriverRate() {
        
    }

    
}
