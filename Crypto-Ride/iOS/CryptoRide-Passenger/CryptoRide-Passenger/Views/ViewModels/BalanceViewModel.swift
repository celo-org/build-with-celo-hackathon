//
//  BalanceServices.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 10/17/22.
//

import Foundation
import BigInt
import web3swift


class BalanceViewModel:ObservableObject {
    
    @Published var balance = ""
    @Published var isLoading = false
    @Published var error:Error? = nil
    
    init() {
        getBalanceUpdate()
    }
   
    public func getBalanceUpdate() {
        isLoading = true
        
        let walletAddress = ContractServices.shared.getWallet()
        let params = [walletAddress.address] as [AnyObject]
        /*
        ContractServices.shared.read(contractId: Contracts.Token, method: "balanceOf", parameters    : params)
        { result in
            DispatchQueue.main.async { [self] in
                isLoading = false
                switch(result){
                case .success(let result):
                    let balanceBigUInt = result["0"] as! BigUInt
                    
                    let balanceString = Web3.Utils.formatToEthereumUnits(balanceBigUInt, toUnits: .eth, decimals: 3)!
                    balance = balanceString+" cUSD"
                case .failure(let error):
                    self.error = ContractError(title: "Failed to get balance.", description: error.errorDescription)
                }
            }
        }
        */
        
    }
    
}
