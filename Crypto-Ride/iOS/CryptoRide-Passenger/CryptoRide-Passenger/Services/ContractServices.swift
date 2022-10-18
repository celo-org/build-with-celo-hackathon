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
    private var driverRoleContract:web3.web3contract
    private var tokenContract:web3.web3contract
       
    init() {
        let keystore = try! EthereumKeystoreV3(privateKey: Data(hex: "PRIVATE KEY"))!

        let keyData = try! JSONEncoder().encode(keystore.keystoreParams);
        
        let address = keystore.addresses!.first!.address
    
        wallet = Wallet(address: address, data: keyData, name: "Passenger", isHD: false)
        // add wallet data to keystoreManager
        let keystoreManager = KeystoreManager([keystore])
        
        let provider = Web3HttpProvider(URL(string: alfajoresTestnet.rpcEndpoint)!, network: .Custom(networkID: alfajoresTestnet.chainId))
        w3 = web3(provider: provider!)
        w3.addKeystoreManager(keystoreManager)
        // TODO change erc20 abi with celo's token abi
        tokenContract = w3.contract(Web3.Utils.erc20ABI, at: cUSD , abiVersion: abiVerison)!
        rideManagerContract = w3.contract(rideManagerAbi,at:rideManagerAddress,abiVersion:abiVerison )!
        driverRoleContract = w3.contract(driverRoleAbi,at:driverRoleAddress,abiVersion:abiVerison )!
         
    }
    
    public func getContract(contract:Contracts) -> web3.web3contract{
        switch(contract) {
        case Contracts.RideManager:
            return rideManagerContract
        case Contracts.DriverRole:
            return driverRoleContract
        case Contracts.Token:
            return tokenContract
            
        }
    }
    

    func read(contractId:Contracts,method:String,parameters:[AnyObject],completion:@escaping(Result<[String:Any],Web3Error>) -> Void) {
        print("read")
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
                                       extraData: Data(),
                                       transactionOptions: options)!
              
                print(tx)
                let result = try tx.call()
                print(result)
                completion(.success(result))
            }catch {
                completion(.failure(error as! Web3Error))
            }
        }
    }
  
    func write(contractId:Contracts,contractABI:String,method:String,parameters:[AnyObject],password:String,completion:@escaping(Result<TransactionSendingResult,Web3Error>) -> Void) {
        let contract = getContract(contract: contractId)
        DispatchQueue.global().async{ [unowned self] in
            do{
                let senderAddress = EthereumAddress(wallet.address)

                let extraData: Data = Data() // Extra data for contract method
                
                var options = TransactionOptions.defaultOptions
                options.from = senderAddress
                options.gasPrice = .automatic
                options.gasLimit = .automatic
                
                let tx = contract.write(
                    method,
                    parameters: parameters,
                    extraData: extraData,
                    transactionOptions: options)!
                
                let result = try tx.send(password: password)
                completion(.success(result))
            }catch {
                completion(.failure(error as! Web3Error))
                
            }
        }
    }
    
}
