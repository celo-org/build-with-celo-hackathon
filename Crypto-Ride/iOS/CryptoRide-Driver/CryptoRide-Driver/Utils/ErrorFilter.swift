//
//  ErrorFilter.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 11/5/22.
//

import Foundation
import web3swift


// MARK: ErrorFilter
///
/// Static error handler for contract errors
///
class ErrorFilter {
    
    // MARK: typeChecks
    /// Fix error formates between the `Error` and `web3swift.Web3Error`
    /// web3swift uses `Web3Error` when contracts tx fails
    ///
    /// - Parameters:
    ///         - `error` `Any` used to check error type
    ///
    /// - Returns:
    ///         - `ContractError` standard class type used between error classes
    static func typeCheck(error:Any) -> ContractError {
        switch(error){
        case is Web3Error:
            let web3Error = error as! Web3Error
            let contractError = ContractError(title: "", description: web3Error.errorDescription)
            return(contractError)
        case is Error:
            let NSError = error as! Error
            let contractError = ContractError(title: "", description: NSError.localizedDescription)
            return(contractError)
        default:
            return(ContractError(title: "Unknown Error", description: "Something bad happened"))
                
        }
    }
    
}

