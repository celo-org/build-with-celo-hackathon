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
    
    @Published var subscriptionState = SubscriptionState.none
    @Published var newEvent = false

    // Progress for driver accepts time
    @Published var progress = 0.0
    private var abortTimer = false
    @Published var timeOver = false
    @Published var driverIndexInProgress:Int? = nil
    
    // Temp ride if driver wants accept ride
    @Published var newAnnounceRide:AnnouncedRide?
    
    @Published var rideId:String? = nil // rideId
    @Published var rideState:Int = 0
    
    private var socketProvider:WebsocketProvider? = nil
    private var subscription:Subscription? = nil
    
    @Published var acceptedDriver:String? = nil
    
    
    init() {
        // Create and connect socket
        // 🔴 Are we connected to internet
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


        let rideId = String(arrayValue[rideIdRange])
        
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
        self.abortTimer = false
        let totalDriver = newAnnounceRide!.driverAddress.count
        let waitTime = Double(totalDriver * 30)
        var secondsRemaining = Double(totalDriver * 30)

        Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { (Timer) in
            if secondsRemaining >= 0 && !self.abortTimer {
                self.progress = secondsRemaining / waitTime
                // index of current driver
                let driverIndex = Int(secondsRemaining) / 30
                if driverIndex < totalDriver {
                    self.driverIndexInProgress = driverIndex
                }
                secondsRemaining -= 1
            } else {
                self.progress = 0.0
                Timer.invalidate()
                
            }
        }
        
    }
     
    
    // MARK: handleEvent
    func handleEvent(message:SocketMessage) {
        switch(message.params.result.topics.first) {
            
            
        case Topics.announceRide.rawValue:
            print("AnnoncedRide")
            let data = message.params.result.data
            let announcedRide = decodeLog(data: data)
            // Check if passenger address match event log event
            rideId = announcedRide.rideId // 🔴 TODO THIS WORKS FOR NOW, BUT WE LISTEN CHECK IF NEW EVENT HAS passenger Address
            rideState = 1
            //if announcedRide.driverAddress.contains(WalletServices.shared.getKeyManager().addresses!.first!) {
            newAnnounceRide = announcedRide
            //rideState = 1
                // Set driver accept time
            timeOver = false
            setDriverAccpetTime()
            
            //}

            
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
                    rideState = 2 // update ridestate known by topic
                    abortTimer = true
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
                    rideState = 3 // update ride state
                    abortTimer = true
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
                    rideState = 4 // update ride state
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
                    rideState = 5 // update ride state
                }
            }
            
        case Topics.cancelRide.rawValue:
            print("Driver canceled ride")
            if rideId != nil {
                //if self.rideId == ride
                rideState = 6
                abortTimer = true
            }
            let data = message.params.result.data
            
        default:
            print("Unkown Topic")
            
        }
    }
    
}
