//
//  LoginViewModel.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/23/22.
//

import Foundation
import web3swift

class LoginViewModel:ObservableObject {
    // login credentials
    @Published var credentials = Credentials()
    // progress during loading
    @Published var showProgressView = false
    // keyStore errors
    @Published var error:WalletServices.KeyStoreServicesError?
    // bool if keyStore exist on device
    @Published var hasKeyStore = WalletServices.shared.hasKeyStore
    // mnemonics for newly created wallets
    @Published var mnemonics = ""

    // MARK: login
    func login(completion: @escaping(Bool) -> Void) {
        
        // Create keystore if no keystore was found
        if !hasKeyStore {
            
            WalletServices.shared.createKeyStore(credentials: credentials) { [unowned self] (result:Result<String, WalletServices.KeyStoreServicesError>) in
                DispatchQueue.main.async { [unowned self] in
                    switch result {
                    case .success(let mnemonics):
                        // show mnemonices
                        self.mnemonics = mnemonics
                        self.showProgressView = false
                        // get mnemonices from
                        completion(true)
                    case .failure(let authError):
                        credentials = Credentials()
                        error = authError
                        completion(false)
                    }
                }
            }
        }else{
            // Checksum with existing keystore
            let keyStore = WalletServices.shared.getKeyManager()
            WalletServices.shared.verifyKeyStore(keyStore: keyStore, credentials: credentials) {  [unowned self] (result:Result<Bool, WalletServices.KeyStoreServicesError>) in
                DispatchQueue.main.async { [unowned self] in
                showProgressView = false
                    switch result {
                    case .success:
                        completion(true)
                    case .failure(let authError):
                        print(authError)
                        credentials = Credentials()
                        error = authError
                        completion(false)
                    }
                }
            }
        }
    }

}
