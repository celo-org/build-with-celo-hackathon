//
//  Abi.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 10/13/22.
//

import Foundation

let abiVerison = 2

let rideManagerAbi =
"""
[
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "rideId",
          "type": "bytes32"
        }
      ],
      "name": "Complete",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "rideId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "driver",
          "type": "address"
        }
      ],
      "name": "DriverAcceptedRide",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "DriverAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "rideId",
          "type": "bytes32"
        }
      ],
      "name": "DriverConfirmsDropOff",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "DriverRemoved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "rideId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "passenger",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "drivers",
          "type": "address[]"
        }
      ],
      "name": "DriversForRide",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "rideId",
          "type": "bytes32"
        }
      ],
      "name": "PassengerConfirmsPickUp",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "rideId",
          "type": "bytes32"
        }
      ],
      "name": "RideCanceled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "StatsChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_startingRate",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_carAssetUrl",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_profileAssetUrl",
          "type": "string"
        }
      ],
      "name": "addDriver",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getDriverRate",
      "outputs": [
        {
          "components": [
            {
              "internalType": "bool",
              "name": "isDriver",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "rate",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "carAssetUrl",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "infoAssetUrl",
              "type": "string"
            }
          ],
          "internalType": "struct DriverRole.Driver",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getReputation",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "rating",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "reputation",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalRating",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "count",
              "type": "uint256"
            }
          ],
          "internalType": "struct ReputationManager.Stat",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "isDriver",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "pause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_newTime",
          "type": "uint256"
        }
      ],
      "name": "setDriverWindow",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unpause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_newRate",
          "type": "uint256"
        }
      ],
      "name": "updateRate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "removeDriver",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "getActiveRide",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_rideId",
          "type": "bytes32"
        }
      ],
      "name": "driverTime",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "rideId",
          "type": "bytes32"
        }
      ],
      "name": "getRide",
      "outputs": [
        {
          "components": [
            {
              "internalType": "bool",
              "name": "shared",
              "type": "bool"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "lat",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "long",
                  "type": "uint256"
                }
              ],
              "internalType": "struct RideManager.Coordinate",
              "name": "startCoordinate",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "lat",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "long",
                  "type": "uint256"
                }
              ],
              "internalType": "struct RideManager.Coordinate",
              "name": "endCoordinate",
              "type": "tuple"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "time",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "acceptedDriver",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "passenger",
              "type": "address"
            },
            {
              "internalType": "enum RideManager.RideState",
              "name": "state",
              "type": "uint8"
            }
          ],
          "internalType": "struct RideManager.Ride",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "rideId",
          "type": "bytes32"
        }
      ],
      "name": "isCanceled",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "lat",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "long",
              "type": "uint256"
            }
          ],
          "internalType": "struct RideManager.Coordinate",
          "name": "_startLocation",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "lat",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "long",
              "type": "uint256"
            }
          ],
          "internalType": "struct RideManager.Coordinate",
          "name": "_endLocation",
          "type": "tuple"
        },
        {
          "internalType": "address[]",
          "name": "_drivers",
          "type": "address[]"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "_shared",
          "type": "bool"
        }
      ],
      "name": "announceRide",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_rideId",
          "type": "bytes32"
        }
      ],
      "name": "driverAcceptsRide",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_rideId",
          "type": "bytes32"
        }
      ],
      "name": "passengerConfirmsPickUp",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_rideId",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "_passengerRating",
          "type": "uint256"
        }
      ],
      "name": "driverConfirmsDropOff",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_rideId",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "_driverRating",
          "type": "uint256"
        }
      ],
      "name": "passengerConfirmsDropOff",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_rideId",
          "type": "bytes32"
        }
      ],
      "name": "cancelRide",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
"""
