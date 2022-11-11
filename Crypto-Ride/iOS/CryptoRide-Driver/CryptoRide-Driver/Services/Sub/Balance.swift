//
//  Balance.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/31/22.
//

import BigInt
import web3swift

// MARK: Balance
/// Manages token balances 
class Balance:ObservableObject {
    // Token balances
    @Published var cUSD:String = ""
    @Published var CELO:String = ""
    
    @Published var isLoading = false
    
    init() {
        // Fetch token balance for driver wallet address
        getTokenBalance(.Celo)
        getTokenBalance(.CUSD)
    }
    
    // MARK: getTokenBalance
    /// Read balance from given a toke contract
    public func getTokenBalance(_ tokenContract:Contracts) {
        isLoading = true
        let ethAddress = ContractServices.shared.getWallet()
        let params = [ethAddress.address] as [AnyObject]
        
        ContractServices.shared.read(contractId:tokenContract, method:  CusdMethods.balanceOf.rawValue, parameters: params) { result in
            DispatchQueue.main.async { [self] in
                isLoading = false
                switch(result) {
                case .success(let result):
                    let rawBalance = result["balance"] as! BigUInt
                    if tokenContract == .CUSD{
                        cUSD = Web3.Utils.formatToEthereumUnits(rawBalance, toUnits: .eth, decimals: 3)!
                    }else{
                        CELO = Web3.Utils.formatToEthereumUnits(rawBalance, toUnits: .eth, decimals: 3)!
                    }
                   
            
                case .failure(let error):
                    print(error)
                }
            }
        }
    }
}
