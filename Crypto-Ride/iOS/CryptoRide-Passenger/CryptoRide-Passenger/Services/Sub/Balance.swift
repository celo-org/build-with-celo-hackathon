//
//  Balance.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 11/1/22.
//

import BigInt
import web3swift

class Balance:ObservableObject {
    @Published var cUSD:String = ""
    @Published var CELO:String = ""
    
    @Published var celoApproved:String = ""
    
    @Published var isLoading = false

    @Published var error:Error? = nil
    
    init() {
        let ethAddress = ContractServices.shared.getWallet()
        getTokenBalance(address:ethAddress.address)
        getAllowance(address: ethAddress.address)
    }
    
    public func getTokenBalance(address:String) {
        isLoading = true
       
        let params = [address] as [AnyObject]
        
        ContractServices.shared.read(contractId:.cUSD, method:  CusdMethods.balanceOf.rawValue, parameters: params) { result in
            DispatchQueue.main.async { [self] in
                isLoading = false
                switch(result) {
                case .success(let result):
                    let rawBalance = result["balance"] as! BigUInt
                    cUSD = Web3.Utils.formatToEthereumUnits(rawBalance, toUnits: .eth, decimals: 3)!
            
                case .failure(let error):
                    self.error = error
                }
            }
        }
        
        ContractServices.shared.read(contractId:.CELO, method:  CusdMethods.balanceOf.rawValue, parameters: params) { result in
            DispatchQueue.main.async { [self] in
                isLoading = false
                switch(result) {
                case .success(let result):
                    let rawBalance = result["balance"] as! BigUInt
                    CELO = Web3.Utils.formatToEthereumUnits(rawBalance, toUnits: .eth, decimals: 3)!
            
                case .failure(let error):
                    self.error = error
                }
            }
        }
    }
    
    public func getAllowance(address:String) {
        let params = [address,rideManagerAddress.address] as [AnyObject]
        ContractServices.shared.read(contractId: .cUSD, method: RideManagerMethods.allowance.rawValue, parameters: params)
        {
            result in
            DispatchQueue.main.async { [unowned self] in
                switch(result) {
                case.success(let value):
                    
                        let weiAllowance = value["0"] as! BigUInt
                        celoApproved = Web3.Utils.formatToEthereumUnits(weiAllowance, toUnits: .eth, decimals: 3)!
                        print(celoApproved)
                   
                case .failure(let error):
                    self.error = error
                    //self.error = ContractError(title: "Failed to get Contract Allowance", description: error.errorDescription)
                }
            }
        }
    }
    
    
    func setApproval(completion:@escaping(TransactionSendingResult) -> Void) {
        //let wei = Web3.Utils.formatToEthereumUnits("1", toUnits: .wei, decimals: 18, decimalSeparator: ".")!
        let wei = 100000000000000000
        let appoveAddress = [rideManagerAddress,wei] as [AnyObject]
        
        ContractServices.shared.write(contractId: .cUSD, method: RideManagerMethods.approve.rawValue, parameters:appoveAddress , password: ""){
            result in
            DispatchQueue.main.async { [unowned self] in
                 switch(result) {
                 case .success(let tx):
                     print(tx)
                 case .failure(let error):
                     self.error = error
                     //self.error = ContractError(title: "Failed to announce ride", description: error.errorDescription)
                 }
         
             }
        }
    }

}
