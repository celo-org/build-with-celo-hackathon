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
    var twitterHandle = "@elonmusk"
    var instagramHandle = "@zuck"
}

struct Vehicle {
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
    // Registration observable
    @Published var registerNewDriver = RegisterDriver()
    @Published var currentView = setView.profile
    
    @Published var isLoading = false
    @Published var error:ContractError? = nil
    
    // Token Transfer variables
    @Published var toAddress = ""
    @Published var amount = ""
    @Published var password = ""
    @Published var tokenSelected = "cUSD"
    var tokenContract:Contracts = .CUSD
    

    // Qr code generator
    private let context = CIContext()
    private let filter = CIFilter.qrCodeGenerator()
    
    
    init() {
        // get driver rate price
        getDriverRate()
    }
    
    // MARK: generateQRCode
    /// Encodes string data as a qr code in a UIImage
    ///
    /// - Parameters:
    ///         - `from string` String containing ethereum address
    ///
    /// - Returns:
    ///         - `UIImage` uiimage containing the qr code
    ///
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
    

    // MARK: getDriverRate
    /// Get driver rate from ride manager contract
    /// - Returns:
    ///         - Escaping <TranscationSendingResult>
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
                    self.error = error
                }
            }
        }
    }
    
    // MARK: registerDriver
    /// Registers driver address to ride manager smart contract
    ///
    /// - Parameters:
    ///         `rate` Integer : drivers flate fee per hour of drive time
    ///         `name`String:   name of driver
    ///         `car` String : car description
    ///
    /// - Returns:
    ///         - Escaping <TranscationSendingResult>
    public func registerDriver(rate:Int,name:String,car:String, completion:@escaping(TransactionSendingResult) -> Void) {
        let params = [rate,name,car] as [AnyObject]
            ContractServices.shared.write(contractId: .RideManager, method: "addDriver", parameters: params, password: password) { result in
                DispatchQueue.main.async { [unowned self] in
                    switch(result){
                    case .success(let result):
                        completion(result)
                    case .failure(let error):
                        self.error = error
                    }
            }
        }
            
    }
    
    // MARK: transfer
    /// Transfers tokens from passengers wallet  to `toAddress`
    /// Note: currently only transfers cUSD token
    ///
    /// - Returns:
    ///              - @escaping(TranscationSendingResult)
    func transfer(completion:@escaping(TransactionSendingResult) -> Void) {
        let amount = Web3.Utils.parseToBigUInt(amount, units: .eth)
        guard let ethAddress = EthereumAddress(toAddress) else {
            self.error = ContractError(title: "Failed", description: "Invalid To Address")
            return
        }
        let params = [ethAddress.address,amount] as [AnyObject]
        ContractServices.shared.write(contractId: tokenContract, method: "transfer", parameters: params, password: password) {
            result in
            DispatchQueue.main.async { [unowned self] in
                
                switch(result){
                case .success(let result):
                    completion(result)
                case .failure(let error):
                    self.error = error
                }
        }
        }
        
    }

    
}
