//
//  WebSockets.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/24/22.
//

import Foundation
import web3swift
import UIKit
import BigInt
import CoreLocation



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
    
    // Published for new rides
    @Published var acceptingNewRides = false
    @Published var newAnnounceRide:AnnouncedRide?
    @Published var abortTimer = false
    
    // Temp ride object when selected annouced ride
    @Published var tempRide:Ride? = nil
    @Published var showInterest = false
    @Published var wasAcceptedByDriver = false
    @Published var cleanMap = false
    
    // Progress for driver to selected a ride
    @Published var progress = 0.0
    
    // Note - RideServices observes changes on ride varibles
    // Ride Id
    @Published var rideId:String? = nil
    // Ride State
    @Published var rideState:Int = 0
    
    // Subscription socket state
    @Published var subscriptionState = SubscriptionState.none
    // Socket & SubscriptionId
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
    
    // MARK: setDriverAccpetTime
    /// Starts timer associated when announceRide is emitted
    ///
    func setDriverAccpetTime() {
        // Start time should be the ride object
        let driverPosition = newAnnounceRide!.driverAddress.firstIndex(of: WalletServices.shared.getKeyManager().addresses!.first!)!
        // currently the contract is set to 30 seconds for each driver to accept a ride
        let driverWaitTime = driverPosition * 30
        let currentTime = Int(Date().timeIntervalSince1970) // in seconds
        let driverStartTimeFromNow = currentTime + driverWaitTime
        // Remaining amount of time for driver to accept ride
        var secondsRemaining = 30
        // Start timer
        Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { (Timer) in
            let now = Int(Date().timeIntervalSince1970)
            // Check if time is has exceeded 30 seconds
            if driverStartTimeFromNow < now {
                if secondsRemaining >= 0 {
                    // set progress to precent left
                    self.progress = Double(secondsRemaining) / 30.0
                    secondsRemaining -= 1
                } else {
                    // set announced ride to nil
                    // aport timer
                    self.newAnnounceRide = nil
                    Timer.invalidate()
                }
            }else if self.abortTimer {
                self.newAnnounceRide = nil
                Timer.invalidate()
            }
        }
    }
    
    
    // MARK: handleEvent
    /// Handles emited events from the ride manager contract
    ///
    /// - Note: Currently handles events only related to change to ride states
    /// - Note: RideManager has observer to are rideState
    ///
    /// - Parameters :
    ///                 - `message` : SocketMessage - raw event log  emitted by contract
    ///
    func handleEvent(message:SocketMessage) {

        switch(message.params.result.topics.first) {
            
        case Topics.announceRide.rawValue:
            // Check if user is accepting new rides
            if acceptingNewRides == false {return}
            // allow timer to start
            abortTimer = false
            // Decode announced ride details
            let data = message.params.result.data
            let announcedRide = LogDecoder.decodeAnnoucedRide(data: data)
            
            // Check if driver is a listed driver in ride
            if announcedRide.driverAddress.contains(WalletServices.shared.getKeyManager().addresses!.first!) {

                // Only set newAnnounceRide if already nil
                if newAnnounceRide == nil {
                    newAnnounceRide = announcedRide
                }
                
                // Set driver acceptance time
                setDriverAccpetTime()
            }
            
           

        case Topics.driverAcceptsRide.rawValue:
           
            let hexString = message.params.result.data as String
            let arrayValue = Array(hexString)
            
            let rideIdRange: ClosedRange = 0...65
            let rideId = String(arrayValue[rideIdRange])

            // Check if we have a ride
            // Driver dosen't need to do anything on this step
            if self.rideId != nil {
                
                // Check if received rideId equals are rideId we accpeted
                if self.rideId == rideId {
                    rideState = 2 // update ridestate known by topic
                }
                
            }else{
                // Check if new announced ride id matches rideId
                if rideId == newAnnounceRide?.rideId {
                    
                    let driverAddressRange: ClosedRange = 90...129
                    let driver = "0x"+String(arrayValue[driverAddressRange])
                    let driverEthAddress = EthereumAddress(driver)!
                    // Check if another driver as accepted the ride before us
                    if driverEthAddress.address != ContractServices.shared.getWallet().address {
                   
                        newAnnounceRide = nil
                        tempRide = nil
                        wasAcceptedByDriver = true
                    }
                }
            }
            return
            
        case Topics.passengerConfirmsPickUp.rawValue:
           

            if self.rideId != nil {
                let hexString = message.params.result.data as String
                let arrayValue = Array(hexString)
                let rideIdRange: ClosedRange = 0...65
                let rideId = String(arrayValue[rideIdRange])
                if self.rideId == rideId{
                    rideState = 3 // update ride state
                }

            }
            return
            
        case Topics.driverConfirmsDropOff.rawValue:
            
            if self.rideId != nil {
                let hexString = message.params.result.data as String
                let arrayValue = Array(hexString)
                let rideIdRange: ClosedRange = 0...65
                let rideId = String(arrayValue[rideIdRange])
                if self.rideId == rideId{
                    rideState = 4
                }
            }
            return
            
        case Topics.complete.rawValue:
           
            if self.rideId != nil {
                
                let hexString = message.params.result.data as String
                let arrayValue = Array(hexString)
                let rideIdRange: ClosedRange = 0...65
                let rideId = String(arrayValue[rideIdRange])
                if self.rideId == rideId{
                    rideState = 5
                }
            }
            return
            
            
        case Topics.cancelRide.rawValue:
       
            if self.rideId != nil {
                let hexString = message.params.result.data as String
                let arrayValue = Array(hexString)
                let rideIdRange: ClosedRange = 0...65
                let rideId = String(arrayValue[rideIdRange])
                if self.rideId == rideId{
                    rideState = 6
                }
            }
            
            return
            
        default:
            // unknown topics are ignored
            print("Unkown Topic")
            
        }
    }
}

