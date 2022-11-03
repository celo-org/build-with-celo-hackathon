//
//  ProfileViewModel.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 10/17/22.
//

import Foundation
import web3swift
import SwiftUI
import CoreImage.CIFilterBuiltins

class ProfileViewModel:ObservableObject {
   
    @Published var lastTx:WriteTransaction?
    @Published var txParams:TxParams = TxParams()
    @Published var error:ContractError?
    @Published var showProgress = false
    
    @Published var toAddress = ""
    @Published var amount = ""
    
    private let context = CIContext()
    private let filter = CIFilter.qrCodeGenerator()
    
    var sendDisabled:Bool {
        txParams.to.isEmpty || txParams.value.isEmpty || showProgress
    }
    
    
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
    
}
