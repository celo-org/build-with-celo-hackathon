//
//  MainBuilderViewModel.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 11/1/22.
//

import Foundation
import web3swift
import BigInt


class MainBuilderViewModel:ObservableObject {
    // Diffrent build states
    enum BuilderStates {
        case rideLocation
        case selectDrivers
        case rideOverView
        case broadCastRide
    }
    // Current build state
    @Published var builderStates = BuilderStates.rideLocation
    // Approval by passenger for contract to transfer funds
    @Published var isApproved = false
    // Current price of ride
    // NOTE: for testing using 0.1 in cUSD
    @Published var ridePrice = 100000000000000000
    // Convert ride price to eth value
    func convertPrice() -> String {
        return(Web3.Utils.formatToEthereumUnits(BigUInt(ridePrice), toUnits: .wei, decimals: 3, decimalSeparator: ".")!)
    }

    // MARK: twitterLink
    // Opens driver twitter profile
    // Note if Twitter app isn't installed uses web browser
    func twitterLink(userName:String) {
        
        let appURL = NSURL(string: "twitter://user?screen_name=\(userName)")!
        let webURL = NSURL(string: "https://twitter.com/\(userName)")!

        let application = UIApplication.shared

        if application.canOpenURL(appURL as URL) {
             application.open(appURL as URL)
        } else {
             application.open(webURL as URL)
        }
    }
    // MARK: facebookLink
    // Opens driver facebook profile
    // Note if facebook app isn't installed uses web browser
    func facebookLink(userName:String) {
        let appURL = NSURL(string: "facebook://user?screen_name=\(userName)")!
        let webURL = NSURL(string: "https://facebook.com/\(userName)")!

        let application = UIApplication.shared

        if application.canOpenURL(appURL as URL) {
             application.open(appURL as URL)
        } else {
             application.open(webURL as URL)
        }
    }

}
