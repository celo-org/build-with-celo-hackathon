//
//  WalletServices.swift
//  CryptoRide-Passenger CryptoRide-Driver
//
//  Created by mitchell tucker on 10/17/22.
//

import Foundation
import web3swift
import Security

class WalletServices {
    static let shared = WalletServices()
    
    public var keystoreManager:BIP32Keystore?
    public var hasKeyStore = false
    
    // Save tag for device keyManager
    private let tag = "com.MOT.CryptoRidePassenger.keyData"
    
    // Errors for class
    enum KeyStoreServicesError:Error,LocalizedError,Identifiable {
        case invalidCredentials
        case failedToGetKeyStore
        case failedToSaveKeyStore

        
        var id:String {
            self.localizedDescription
        }
        
        var errorDescription: String? {
            switch self {
            case.invalidCredentials:
                return NSLocalizedString("Your password in incorrect. Please try again", comment: "")
            case.failedToGetKeyStore:
                return NSLocalizedString("Failed to find key store.", comment: "")
            case.failedToSaveKeyStore:
                return NSLocalizedString("Failed to save key store.", comment: "")

            }
        }
    }
    
    init(){
            // check for keystore
            guard let keystore = readKeyStore() else { return  }
            keystoreManager = keystore
            hasKeyStore = true
    }
    
    func getKeyManager() -> BIP32Keystore {
        return keystoreManager!
    }
    
    

    // MARK: createKeyStore
    /// Creates new keystore and writes to file
    ///
    /// - Parameters:
    ///                 - `credentials` : Password used to create keyStore
    ///
    ///
    /// - Returns: completion: Bool on success , KeyStoreServicesError on failure
    ///
    func createKeyStore(credentials:Credentials,completion:@escaping(Result<String,KeyStoreServicesError>) -> Void) {
        DispatchQueue.global().async{ [unowned self] in
            do {
                let bitsOfEntropy: Int = 256 // Entropy is a measure of password strength. Usually used 128 or 256 bits.
                let mnemonics = try! BIP39.generateMnemonics(bitsOfEntropy: bitsOfEntropy)!
                
                // TODO Change password to biometric password
                let keystore = try! BIP32Keystore(
                    mnemonics: mnemonics,
                    password: credentials.password,
                    mnemonicsPassword: "",
                    language: .english)!
                
                let keyData = try! JSONEncoder().encode(keystore.keystoreParams)
                
                keystoreManager = keystore
            
                let addQuery : [String:Any] = [kSecClass as String: kSecClassGenericPassword as String,
                                               kSecAttrAccount as String: tag,
                                               kSecValueData as String: keyData]
                
                // This could be used if user wants to change keyStores (different wallet)
                // Use update https://developer.apple.com/documentation/security/keychain_services/keychain_items/updating_and_deleting_keychain_items
                SecItemDelete(addQuery as CFDictionary)
                
                // Save keyStore in device keyManager
                let status = SecItemAdd(addQuery as CFDictionary, nil)
                
                guard status == errSecSuccess else { throw KeyStoreServicesError.failedToSaveKeyStore}
                
                completion(.success(mnemonics))
            } catch {
                completion(.failure(.failedToSaveKeyStore))
            }
        }
    }
    
    // MARK: checkKeyStore
    /// Verifys keystore ownership
    ///
    /// - Note : Currently we use the regenerate method within the BIP32Keystore class to verifty password.
    ///
    /// - Parameters :
    ///                 - `keyStore` : BIP32Keystore - Key store used to check password against
    ///                 - `credentials` : Credentials - Password used to check keyStore
    ///
    /// - Returns: completion: Bool on success , KeyStoreServicesError on failure
    ///
    func verifyKeyStore(keyStore:BIP32Keystore,credentials:Credentials,completion:@escaping(Result<Bool,KeyStoreServicesError>) -> Void) {
            DispatchQueue.global().async{
                do{
                    try keyStore.regenerate(oldPassword: credentials.password, newPassword:credentials.password)
                    completion(.success(true))
                }catch{
                    completion(.failure(KeyStoreServicesError.invalidCredentials))
                }
            }
        }
        
    
    // MARK: readKeyStore
    /// Returns reads keystore from device key manager.
    ///
    /// - Returns: reads keystore from file `BIP32Keystore`
    ///
    func readKeyStore() -> BIP32Keystore? {
        
        let query: [String : Any] = [
                    kSecClass as String       : kSecClassGenericPassword,
                    kSecAttrAccount as String : tag,
                    kSecReturnData as String  : kCFBooleanTrue!,
                    kSecMatchLimit as String  : kSecMatchLimitOne ]
    
        
        var dataTypeRef: AnyObject? = nil
        let status: OSStatus = SecItemCopyMatching(query as CFDictionary, &dataTypeRef)
    
        if status == noErr {
            let data =  dataTypeRef as! Data?
            return BIP32Keystore(data!)
          
        }else{
            return nil
        }
    }

}

