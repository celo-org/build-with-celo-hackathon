//
//  Contract.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 10/13/22.
//

import Foundation
import web3swift
import BigInt


class ContractServices {
    
    static let shared = ContractServices()
    
    private var w3:web3
    private var wallet:Wallet
    
    private var rideManagerContract:web3.web3contract
    private var cUSDToken:web3.web3contract
    private var celoToken:web3.web3contract
       
    init() {
        
        let keystore = WalletServices.shared.keystoreManager!
        
        let keyData = try! JSONEncoder().encode(keystore.keystoreParams);
        let address = keystore.addresses!.first!.address
    
        wallet = Wallet(address: address, data: keyData, name: "Passenger", isHD: true)
  
        // add wallet data to keystoreManager
        let keystoreManager = KeystoreManager([keystore])
        
        let provider = Web3HttpProvider(URL(string: alfajoresTestnet.rpcEndpoint)!, network: .Custom(networkID: alfajoresTestnet.chainId))
        w3 = web3(provider: provider!)
        w3.addKeystoreManager(keystoreManager)
        
        
        // TODO change erc20 abi with celo's token abi
        cUSDToken = w3.contract(Web3.Utils.erc20ABI, at: cUSD , abiVersion: abiVerison)!
        celoToken = w3.contract(Web3.Utils.erc20ABI, at: celo , abiVersion: abiVerison)!
        
        rideManagerContract = w3.contract(rideManagerAbi,at:rideManagerAddress,abiVersion:abiVerison )!
       
    }
    
    // MARK: getWallet
    /// Returns wallet struct
    func getWallet() -> Wallet {
        return self.wallet
    }
    
    public func getContract(contract:Contracts) -> web3.web3contract{
        switch(contract) {
        case Contracts.RideManager:
            return rideManagerContract
        case Contracts.cUSD:
            return cUSDToken
        case Contracts.CELO:
            return celoToken
        }
    }
    

    func read(contractId:Contracts,method:String,parameters:[AnyObject],completion:@escaping(Result<[String:Any],Error>) -> Void) {
    
        let contract = getContract(contract: contractId)
        DispatchQueue.global().async{ [unowned self] in
            do{
                
                let senderAddress = EthereumAddress(wallet.address)
                let extraData: Data = Data() // Extra data for contract method
                
                //var options = TransactionOptions
                
                var options = TransactionOptions.defaultOptions
                options.from = senderAddress
                options.gasPrice = .automatic
                options.gasLimit = .automatic
            
          
                let tx = contract.read(method,
                                       parameters: parameters,
                                       extraData: extraData,
                                       transactionOptions: options)!
              
         
                let result = try tx.call()
               
                completion(.success(result))
            }catch {
                completion(.failure(error))
            }
        }
    }
  
    func write(contractId:Contracts,method:String,parameters:[AnyObject],password:String,completion:@escaping(Result<TransactionSendingResult,Error>) -> Void) {
        let contract = getContract(contract: contractId)
        DispatchQueue.global().async{ [unowned self] in
            do{
                let senderAddress = EthereumAddress(wallet.address)

                let extraData: Data = Data() // Extra data for contract method
                
                var options = TransactionOptions.defaultOptions
                options.from = senderAddress
                options.gasPrice = .manual(20000000000)
                options.gasLimit = .manual(878423)
                
                let tx = contract.write(
                    method,
                    parameters: parameters,
                    extraData: extraData,
                     transactionOptions: options)!
                
                let result = try tx.send(password: password)
                completion(.success(result))
            }catch {
                completion(.failure(error))
                
            }
        }
    }
    
}
