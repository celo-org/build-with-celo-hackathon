//
//  ProfileViewModel.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 10/17/22.
//

import Foundation
import web3swift
import SwiftUI
import CoreImage.CIFilterBuiltins // qr code generation


class ProfileViewModel:ObservableObject {
   
    // Errors
    @Published var error:ContractError?
    @Published var showProgress = false
    // Transfer variables
    @Published var toAddress = ""
    @Published var amount = ""
    @Published var password = ""
    @Published var tokenSelected = "cUSD"
    var tokenContract:Contracts = .cUSD
    // Qr code
    private let context = CIContext()
    private let filter = CIFilter.qrCodeGenerator()
    
    
    // MARK: generateQRCode
    /// Encodes string data as a qr code in a UIImage
    ///
    /// - Parameters:
    ///         - `from string` String containing ethereum address
    ///
    /// - Returns:
    ///         - `UIImage` uiimage containing the qr code
    ///
    func generateQRCode(from string: String) -> UIImage {
            let data = Data(string.utf8)
            filter.setValue(data, forKey: "inputMessage")
            if let qrCodeImage = filter.outputImage {
                if let qrCodeCGImage = context.createCGImage(qrCodeImage, from: qrCodeImage.extent) {
                    return UIImage(cgImage: qrCodeCGImage)
                }
            }
            return UIImage(systemName: "xmark") ?? UIImage()
        }
    
    // MARK: transfer
    /// Transfers tokens from passengers wallet  to `toAddress`
    /// Note: currently only transfers cUSD token
    ///
    /// - Returns:
    ///              - @escaping(TranscationSendingResult)
    func transfer(completion:@escaping(TransactionSendingResult) -> Void) {
        let amount = Web3.Utils.parseToBigUInt(amount, units: .eth)
        guard let ethAddress = EthereumAddress(toAddress) else {
            self.error = ContractError(title: "Failed", description: "Invalid To Address")
            return
        }
        let params = [ethAddress.address,amount] as [AnyObject]
        ContractServices.shared.write(contractId: tokenContract, method: "transfer", parameters: params, password: password) {
            result in
            DispatchQueue.main.async { [unowned self] in
                switch(result){
                case .success(let result):
                    completion(result)
                case .failure(let error):
                    self.error = error
                }
            }
        }
        
    }
    
}
