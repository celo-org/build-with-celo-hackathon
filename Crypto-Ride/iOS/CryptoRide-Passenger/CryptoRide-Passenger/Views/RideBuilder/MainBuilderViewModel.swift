//
//  MainBuilderViewModel.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 11/1/22.
//

import Foundation



class MainBuilderViewModel:ObservableObject {
    
    enum BuilderStates {
        case rideLocation
        case selectDrivers
        case rideOverView
        case broadCastRide
    }
    
    @Published var builderStates = BuilderStates.rideLocation


}
