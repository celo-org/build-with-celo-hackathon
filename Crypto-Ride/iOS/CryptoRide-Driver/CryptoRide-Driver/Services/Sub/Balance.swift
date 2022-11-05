//
//  Balance.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/31/22.
//

import BigInt
import web3swift

class Balance:ObservableObject {
    @Published var cUSD:String = ""
    @Published var CELO:String = ""
    
    @Published var isLoading = false
    
    func updatecUSD(cusd:String) {
        cUSD = cusd
    }
    func updatecCELO(celo:String) {
        CELO = celo
    }
    
    init() {
        getTokenBalance()
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
                    cUSD = Web3.Utils.formatToEthereumUnits(rawBalance, toUnits: .eth, decimals: 3)!
            
                case .failure(let error):
                    print(error)
                }
            }
        }
    }
}
