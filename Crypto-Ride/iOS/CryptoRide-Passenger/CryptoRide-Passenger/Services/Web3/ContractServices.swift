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
    // Shared contract instance
    static let shared = ContractServices()
    // Web3 instance
    private var w3:web3
    // Wallet
    private var wallet:Wallet
    
    // Contract addresses
    private var rideManagerContract:web3.web3contract
    private var cUSDToken:web3.web3contract
    private var celoToken:web3.web3contract
       
    init() {
        // Get wallet data from keystore manager
        let keystore = WalletServices.shared.keystoreManager!
        let keyData = try! JSONEncoder().encode(keystore.keystoreParams);
        let address = keystore.addresses!.first!.address
        wallet = Wallet(address: address, data: keyData, name: "Passenger", isHD: true)
  
        // add keystore to keystoreManager used for signing tx
        let keystoreManager = KeystoreManager([keystore])
        // Set up web provider
        let provider = Web3HttpProvider(URL(string: alfajoresTestnet.rpcEndpoint)!, network: .Custom(networkID: alfajoresTestnet.chainId))
        w3 = web3(provider: provider!)
        w3.addKeystoreManager(keystoreManager)
        
        // Set up web3 contracts
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
    
    // MARK: getContract
    /// match contract enum to web3 contract
    ///
    ///
    /// - Parameters :
    ///                 - `contract` : Contracts  Enum - Contract  to get
    ///
    /// - Returns: web3.web3contract of related contract
    private func getContract(contract:Contracts) -> web3.web3contract{
        switch(contract) {
        case Contracts.RideManager:
            return rideManagerContract
        case Contracts.cUSD:
            return cUSDToken
        case Contracts.CELO:
            return celoToken
        }
    }
    
    // MARK: read
    /// async method to read data from a given contract method
    ///
    ///
    /// - Parameters :
    ///                 - `contractId` : Enum type - as contract used to read from
    ///                 - `method` : String - called contract methods
    ///                 - `parameters` :  [AnyObject] - parameters associated with contract call
    ///
    /// - Returns: completion: <String:Any> on success , `ContractError` on failure
    ///
    func read(contractId:Contracts,method:String,parameters:[AnyObject],completion:@escaping(Result<[String:Any],ContractError>) -> Void) {
    
        let contract = getContract(contract: contractId)
        DispatchQueue.global().async{ [unowned self] in
            do{
                
                let senderAddress = EthereumAddress(wallet.address)
                let extraData: Data = Data() // Extra data for contract method
                
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
                completion(.failure(ErrorFilter.typeCheck(error: error)))
            }
        }
    }
    
    // MARK: write
    /// async method to write data to a given contract method
    ///
    /// - Parameters :
    ///                 - `contractId` : Enum type - as contract used to read from
    ///                 - `method` : String - called contract methods
    ///                 - `parameters` :  [AnyObject] - parameters associated with contract call
    ///                 - `password`:String - password of keymanager used to sign transaction
    ///
    /// - Returns: completion: `TransactionSendingResult` on success , `ContractError` on failure
    ///
    func write(contractId:Contracts,method:String,parameters:[AnyObject],password:String,completion:@escaping(Result<TransactionSendingResult,ContractError>) -> Void) {
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
                completion(.failure(ErrorFilter.typeCheck(error: error)))
                
            }
        }
    }
    
}
