//
//  Balance.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 11/1/22.
//

import BigInt
import web3swift

class Balance:ObservableObject {
    // Token balances
    @Published var cUSD:String = ""
    @Published var CELO:String = ""
    // Amount approved for
    @Published var celoApproved:String = ""
    // Loading and error
    @Published var isLoading = false
    @Published var error:Error? = nil
    // Wallet address
    let ethAddress = ContractServices.shared.getWallet()
    
    private var password = ""
    
    init(password:String) {
        self.password = password
        // fetch token balance on init
        getTokenBalance(.cUSD)
        getTokenBalance(.CELO)
        // fetch ride manager allowance
        getAllowance()
    }
    
    // MARK: getTokenBalance()
    /// Fetches and sets token balance for given a token Id
    ///
    /// - Parameters:
    ///         - `token` token to get balance of
    ///
    public func getTokenBalance(_ token:Contracts) {
        isLoading = true

        let params = [ethAddress.address] as [AnyObject]
        
        ContractServices.shared.read(contractId:token, method:  CusdMethods.balanceOf.rawValue, parameters: params) { result in
            DispatchQueue.main.async { [self] in
                isLoading = false
                switch(result) {
                case .success(let result):
                    let rawBalance = result["balance"] as! BigUInt
                    // set token balance of token id
                    if token == .CELO{
                        CELO = Web3.Utils.formatToEthereumUnits(rawBalance, toUnits: .eth, decimals: 3)!
                    }else{
                        cUSD = Web3.Utils.formatToEthereumUnits(rawBalance, toUnits: .eth, decimals: 3)!
                    }
                    
            
                case .failure(let error):
                    print(error)
                }
            }
        }
    }
    
    // MARK: getAllowance
    /// Get allowance of ridemanager contract given by wallet address
    public func getAllowance() {
        let params = [ethAddress.address,rideManagerAddress.address] as [AnyObject]
        ContractServices.shared.read(contractId: .cUSD, method: RideManagerMethods.allowance.rawValue, parameters: params)
        {
            result in
            DispatchQueue.main.async { [unowned self] in
                switch(result) {
                case.success(let value):
                    
                        let weiAllowance = value["0"] as! BigUInt
                        celoApproved = Web3.Utils.formatToEthereumUnits(weiAllowance, toUnits: .eth, decimals: 3)!
                   
                case .failure(let error):
                    self.error = error
                }
            }  
        }
    }
    
    // MARK: setApproval
    ///  Sets the approval amount for the ride manager contract
    ///  Note set amount will be ride price prior to annoucing a ride
    /// - Parameters:
    ///         - `amount` amount to approve
    func setApproval(amount:Double,completion:@escaping(TransactionSendingResult) -> Void) {
        //let bigAmount = BigUInt(exactly: Int(amount))!
        //let wei = Web3.Utils.formatToEthereumUnits(bigAmount, toUnits: .wei, decimals: 18, decimalSeparator: ".")!
         let wei = 100000000000000000
        let appoveAddress = [rideManagerAddress,wei] as [AnyObject]
        
        ContractServices.shared.write(contractId: .cUSD, method: RideManagerMethods.approve.rawValue, parameters:appoveAddress , password: password){
            result in
            DispatchQueue.main.async { [unowned self] in
                 switch(result) {
                 case .success(let tx):
                     completion(tx)
                 case .failure(let error):
                     self.error = error
                 }
         
             }
        }
    }

}
