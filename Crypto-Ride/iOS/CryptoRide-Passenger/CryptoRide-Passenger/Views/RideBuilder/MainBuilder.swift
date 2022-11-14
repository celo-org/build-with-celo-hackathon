//
//  MainBuilder.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 11/1/22.
//

import SwiftUI

struct MainBuilder: View {
    
    @StateObject var mainBuilderVM = MainBuilderViewModel()
    
    @EnvironmentObject var rideService:RideService
    @EnvironmentObject var manager:LocationManager
    @EnvironmentObject var balance:Balance

    // MARK: builderView
    ///  Switch between different ride building views
    ///  Switches by main builder view model builder states 
    func builderViews() -> AnyView {
        switch(mainBuilderVM.builderStates) {
        case .rideLocation:
            return(
                AnyView(RideLocation().environmentObject(rideService)
                    .environmentObject(mainBuilderVM))
            )
        case .selectDrivers:
            return(
                AnyView(SelectDrivers().environmentObject(manager)
                    .environmentObject(mainBuilderVM))
            )
        case .rideOverView:
            return(
                AnyView(RideOverView().environmentObject(manager)
                    .environmentObject(rideService)
                    .environmentObject(mainBuilderVM)
                    .environmentObject(balance))
            )
        case .broadCastRide:
            return(
                AnyView(BroadCastRide())
            )
        }
    }
    
    var body: some View {
        builderViews()
    }
}

struct MainBuilder_Previews: PreviewProvider {
    static var previews: some View {
        MainBuilder()
    }
}
