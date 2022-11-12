//
//  WebSockets.swift
//  CryptoRide-Passenger CryptoRide-Driver
//
//  Created by mitchell tucker on 10/24/22.
//

// Currently this file is not in use

import Foundation
import Combine
import SwiftUI
import web3swift
import BigInt

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
    // Subscription socket state
    @Published var subscriptionState = SubscriptionState.none
    // Socket & SubscriptionId
    private var socketProvider:WebsocketProvider? = nil
    private var subscription:Subscription? = nil

    // Progress for driver accepts time
    @Published var progress = 0.0
    
    // Timer shutdowns
    private var abortTimer = false
    @Published var timeOver = false
    
    @Published var driverIndexInProgress:Int? = nil
    @Published var newAnnounceRide:AnnouncedRide?
    
    // Note - RideServices observes changes on ride varibles
    // Ride Id
    @Published var rideId:String? = nil
    // Ride State
    @Published var rideState:Int = 0
    
    
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
    
    // MARK: gotError
    /// Errors that could arise
    func gotError(error: Error) {
        print("Got error \(error)")
    }
    
    // MARK: setDriverAccpetTime
    /// Starts timer associated when announceRide is emitted
    ///
    func setDriverAccpetTime() {
        self.abortTimer = false
        // get total drivers count from annouced ride
        let totalDriver = newAnnounceRide!.driverAddress.count
        // Calculate total wait time
        let waitTime = Double(totalDriver * 30)
        var secondsRemaining = Double(totalDriver * 30)
        // Start timer
        Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { (Timer) in
            // Check if timer is over or aborted
            if secondsRemaining >= 0 && !self.abortTimer {
                // Set progress
                self.progress = secondsRemaining / waitTime
                // index of current driver
                let driverIndex = Int(secondsRemaining) / 30
                if driverIndex < totalDriver {
                    self.driverIndexInProgress = driverIndex
                }
                // subtract seconds remaining
                secondsRemaining -= 1
            } else {
                // Set progress to zero & stop timer
                self.progress = 0.0
                Timer.invalidate()
                
            }
        }
    }
     
    
    // MARK: handleEvent
    /// Handles emited events from the ride manager contract
    ///
    /// - Note: Currently handles events only related to change to ride states
    ///
    /// - Parameters :
    ///                 - `message` : SocketMessage - raw event log  emitted by contract
    ///
    func handleEvent(message:SocketMessage) {
     
        switch(message.params.result.topics.first) {
        case Topics.announceRide.rawValue:
            // Check if are rideId is empty
            if rideId == nil {
                let data = message.params.result.data
                // decode are log data
                let announcedRide = LogDecoder.decodeAnnoucedRide(data: data)
                // Check if annouced ride matches are address
                if announcedRide.passengerAddress.address == ContractServices.shared.getWallet().address {
                    // set rideId to announced rideId
                    rideId = announcedRide.rideId
                    // Change ride state
                    rideState = 1
                    newAnnounceRide = announcedRide
                    // Start timer
                    timeOver = false
                    setDriverAccpetTime()
                }
            }
            
        case Topics.driverAcceptsRide.rawValue:
            // check if rideId is not nil
            if rideId != nil {
                
                //let arrayValue = Array(message.params.result.data)
                // Driver Address range currently not used
                //let driverRange: ClosedRange = 90...129
   
                let rideId = LogDecoder.decodeRideId(data: message.params.result.data)

                // Check if recived rideId equals are rideId
                if self.rideId! == rideId {
                    rideState = 2 // update ridestate known by topic
                    // abort timer
                    abortTimer = true
                }
            }
            
        case Topics.passengerConfirmsPickUp.rawValue:
            if self.rideId != nil {
                let rideId = LogDecoder.decodeRideId(data: message.params.result.data)
                if self.rideId == rideId{
                    rideState = 3 // update ride state
                    abortTimer = true
                }

            }
        case Topics.driverConfirmsDropOff.rawValue:
            if self.rideId != nil {
                let rideId = LogDecoder.decodeRideId(data: message.params.result.data)
                if self.rideId == rideId{
                    rideState = 4 // update ride state
                }
            }
            
        case Topics.passengerConfirmsDropOff.rawValue:
            if self.rideId != nil {
                let rideId = LogDecoder.decodeRideId(data: message.params.result.data)
                if self.rideId == rideId{
                    rideState = 5 // update ride state
                    // Discard rideId when ride is complete
                    self.rideId = nil
                }
            }
            
        case Topics.cancelRide.rawValue:
            if rideId != nil {
                let rideId = LogDecoder.decodeRideId(data: message.params.result.data)
                if self.rideId == rideId {
                    rideState = 6
                    abortTimer = true
                    // Discard rideId when ride is canceled
                    self.rideId = nil
                }
            }
            
        default:
            print("Unkown Topic")
            
        }
    }
    
}
