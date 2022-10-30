//
//  WebSockets.swift
//  CryptoRide-Passenger CryptoRide-Driver
//
//  Created by mitchell tucker on 10/24/22.
//

// Currently this file is not in use

import Foundation
import SwiftUI
import web3swift
import UIKit
import BigInt

struct Ride {
    var shared:Bool = false
    var startCoordinates:[BigUInt] = []
    var endCoordinates:[BigUInt] = []
    var price:BigUInt = 0
    var time:BigUInt = 0
    var acceptedDriver:EthereumAddress? = nil
    var passenger:EthereumAddress? = nil
    var rideState:BigUInt = 0
}


// MARK: - SocketMessage
struct SocketMessage: Codable {
    let jsonrpc, method: String
    let params: SocketParams
}

// MARK: - SocketParams
struct SocketParams: Codable {
    let subscription: String
    let result: SocketResult
}

// MARK: - SocketResult
struct SocketResult: Codable {
    let address: String
    let topics: [String]
    let data, blockNumber, transactionHash, transactionIndex: String
    let blockHash, logIndex: String
    let removed: Bool
}


// MARK: WebSockets
/// Connects and subscribes to events emitted by the smart contract

class WebSockets:Web3SocketDelegate,ObservableObject {
    // {"jsonrpc":"2.0","id":1,"result":"0x948b48a1cc95a23b757cee5ab832b93c"}
    struct Subscription: Codable {
        let jsonrpc, result: String
        let id:Int
    }
    struct Unsubscribe:Codable{
        let jsonrpc: String
        let result: Bool
        let id:Int
    }
    
    enum SubscriptionState {
        case none
        case subscribed
        case unsubscribed
    }
    
    let isDriver = false
    
    @Published var subscriptionState = SubscriptionState.none
    @Published var newEvent = false
    @Published var newAnnounceRide:AnnouncedRide?

    @Published var progress = 0.0
    
    @Published var rideId:String? = nil // rideId
    @Published var ride:Ride? = nil // Ride obj
    
    private var socketProvider:WebsocketProvider? = nil

    private var subscription:Subscription? = nil
    
    init() {
        
        // Create and connect socket
        socketProvider = WebsocketProvider(webSocketURI, delegate: self)
        socketProvider!.connectSocket()
    }
    
    
    // MARK: disconnectSocket
    ///  Unsubscribes the the socket using the subscription id as parameter
    func disconnectSocket() {
        let ethUnsubscribe =
                    """
                        {"jsonrpc":"2.0", "id": 1, "method": "eth_unsubscribe", "params": ["\(subscription!.result)"]}
                    """
        subscriptionState = .unsubscribed
        socketProvider!.socket.write(string: ethUnsubscribe)
    }
    
    // MARK: socketConnected
    /// Writes to the socket when connected
    /// Only subscribing to contract logs, that includes emitted events
    /// For more subscription request params https://docs.infura.io/infura/networks/ethereum/json-rpc-methods/subscription-methods/eth_subscribe
    func socketConnected(_ headers: [String : String]) {
        let ethSubscribe =
                    """
                            {"jsonrpc":"2.0", "id": 1, "method": "eth_subscribe", "params": ["logs", {"address": "\(rideManagerAddress.address)" } ]}
                    """
        socketProvider!.socket.write(string: ethSubscribe)
    }
    
    // MARK: received
    /// Receives messages from the socket provider
    func received(message: Any) {
        let stringMessage = message as! String
        let data = Data(stringMessage.utf8)
        let decoder = JSONDecoder()
        do {
            switch(subscriptionState){
            case .none:
                // Need to receive are subscription id
                subscription = try decoder.decode(Subscription.self, from: data)
                subscriptionState = .subscribed
            case .subscribed:
                // We are subscribed, must be events
                let event = try decoder.decode(SocketMessage.self, from: data)
                handleEvent(message: event)
            case .unsubscribed:
                // unsubscribed is set during disconnecting, decode successful message
                let unsubscribed = try decoder.decode(Unsubscribe.self, from: data)
                if unsubscribed.result {
                    socketProvider!.socket.disconnect()
                }
            }
        }catch{
            print(error.localizedDescription)
        }
    }
    
    func gotError(error: Error) {
        print("Got error \(error)")
    }
    
    
    struct AnnouncedRide {
        let rideId: String
        let valueId: String
        let addressCount: Int
        let driverAddress:[EthereumAddress]
    }
    
    // TODO decode into types
    func decodeLog(data:String) -> AnnouncedRide {
        let hexString = data.dropFirst(2)
        let arrayValue = Array(hexString)

        let rideIdRange: ClosedRange = 0...63
        let valueRange: ClosedRange = 64...127
        let arrayCountRange: ClosedRange = 128...191
        //let addressOne: ClosedRange = 192...255
        //let addressTwo: ClosedRange = 256...319

        let rideId = String(arrayValue[rideIdRange])
        //
        let valueId = String(arrayValue[valueRange])
        //idkValue.count
        let arrayCount = String(arrayValue[arrayCountRange])
        //arrayCountValue.count
        let amount = Int(arrayCount)!
        
        var start = 192
        var end = 255
        var driverAddress:[EthereumAddress] = []
        for _ in 0...(amount - 1) {
            let addressRange: ClosedRange = start...end
            let bytes32Address = String(arrayValue[addressRange])
            
            // Hacky way to force a bytes32 to ethereum address
            let addressArray = Array(bytes32Address)
            let cutZero: ClosedRange = 24...63
            var address = String(addressArray[cutZero])
            address = "0x"+address
            driverAddress.append(EthereumAddress(address)!)
            
            start += 64
            end += 64
        }
        let announcedRide = AnnouncedRide(
            rideId: "0x" + rideId,
            valueId: valueId,
            addressCount: amount,
            driverAddress: driverAddress)
        return(announcedRide)
    }
    
    
    func setDriverAccpetTime() {
        // Start time should be in the ride object
        let driverPosition = newAnnounceRide!.driverAddress.firstIndex(of: WalletServices.shared.getKeyManager().addresses!.first!)!
        // currently the contract is set to 30 seconds for each driver to accept a ride
        let driverWaitTime = driverPosition * 30
        let currentTime = Int(Date().timeIntervalSince1970) // in seconds
        let driverStartTimeFromNow = currentTime + driverWaitTime
        
        var secondsRemaining = 30

        Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { (Timer) in
            let now = Int(Date().timeIntervalSince1970)
            if driverStartTimeFromNow < now {
                if secondsRemaining >= 0 {
                    self.progress = Double(secondsRemaining) / 30.0
                    //print(progress)
                    //print ("\(secondsRemaining) seconds")
                    secondsRemaining -= 1
                } else {
                    self.progress = 0.0
                    Timer.invalidate()
                }
            }
        }
    }
     
    
    // MARK: handleEvent
    func handleEvent(message:SocketMessage) {
        print("message")

        switch(message.params.result.topics.first) {
            
        case Topics.announceRide.rawValue:
            let data = message.params.result.data
            let announcedRide = decodeLog(data: data)
            rideId = announcedRide.rideId
            if announcedRide.driverAddress.contains(WalletServices.shared.getKeyManager().addresses!.first!) {
                newAnnounceRide = announcedRide
                // Set driver accept time
                setDriverAccpetTime()
            }
           

            
        case Topics.driverAcceptsRide.rawValue:
            // check if rideId is not nil
            if rideId != nil {
                print("Driver accepts ride")
                let hexString = message.params.result.data as String
                let arrayValue = Array(hexString)
                
                let rideIdRange: ClosedRange = 0...65
                let driverAddressRange: ClosedRange = 66...129
                print(driverAddressRange)
                let rideId = String(arrayValue[rideIdRange])
                print(rideId)
                print(self.rideId)
                // Check if recived rideId equals are rideId
                if self.rideId! == rideId {
                    ride!.rideState = 2 // update ridestate known by topic
                    // set driver address in ride
                    //let driverAddress = String(arrayValue[driverAddressRange])
                    //ride!.acceptedDriver = EthereumAddress(driverAddress)!
                    //print(driverAddress)
                }
            }
            
        case Topics.passengerConfirmsPickUp.rawValue:
            print("Passenger Confirms PickUp")
            if self.rideId != nil {
                let hexString = message.params.result.data as String
                let arrayValue = Array(hexString)
                let rideIdRange: ClosedRange = 0...65
                let rideId = String(arrayValue[rideIdRange])
                if self.rideId == rideId{
                    ride!.rideState = 3 // update ride state
                }

            }
        case Topics.driverConfirmsDropOff.rawValue:
            print("Driver Confirms drop off")
            if self.rideId != nil {
                let hexString = message.params.result.data as String
                let arrayValue = Array(hexString)
                let rideIdRange: ClosedRange = 0...65
                let rideId = String(arrayValue[rideIdRange])
                if self.rideId == rideId{
                    ride!.rideState = 4 // update ride state
                }
            }
            
        case Topics.passengerConfirmsDropOff.rawValue:
            print("Passenger Confirms drop off")
            if self.rideId != nil {
                let hexString = message.params.result.data as String
                let arrayValue = Array(hexString)
                let rideIdRange: ClosedRange = 0...65
                let rideId = String(arrayValue[rideIdRange])
                if self.rideId == rideId{
                    ride!.rideState = 5 // update ride state
                }
            }
            
        case Topics.cancelRide.rawValue:
            print("Driver canceled ride")
            if rideId != nil {
                
            }
            let data = message.params.result.data
            
        default:
            print("Unkown Topic")
            
        }
    }
    
}
