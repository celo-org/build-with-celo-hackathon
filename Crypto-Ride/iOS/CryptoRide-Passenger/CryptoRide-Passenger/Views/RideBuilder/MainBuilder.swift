//
//  MainBuilder.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 11/1/22.
//

import SwiftUI

struct MainBuilder: View {
    
    //@State var builderStates = BuilderStates.rideLocation
    @StateObject var mainBuilderVM = MainBuilderViewModel()
    
    @EnvironmentObject var rideService:RideService
    @EnvironmentObject var manager:LocationManager
    @EnvironmentObject var balance:Balance
    
    /*
    func changeRideBuildState(back:Bool) {
        switch(mainBuilderVM.builderStates){
        case .rideLocation:
            if back {return}
            mainBuilderVM.builderStates = .selectDrivers
        case .selectDrivers:

            if back {
                mainBuilderVM.builderStates = .rideOverView
            }else{
                // Snap map to the route
                manager.snapToRoute = true
                //rideService.getAllowance(address: ContractServices.shared.getWallet().address)
                mainBuilderVM.builderStates = .rideOverView
            }
        case .rideOverView:
           
            if back {
                mainBuilderVM.builderStates = .selectDrivers
            }else {

                let onlyAddress = manager.drivers.map { $0.address }
                print("BroadCast ride")
                //rideService.broadCastRide(startLocation: rideService.startLocation!, endLocation: rideService.endLocation!, driverlist: onlyAddress, ridePrice: manager.normalizedPrice) { success in
                    //rideService.getActiveRide(address: ContractServices.shared.getWallet().address)
                //}
                //mainBuilderVM.builderStates = .selectDrivers
            }
            
        }
    }
    */
    
    func builderViews() -> AnyView {
        switch(mainBuilderVM.builderStates) {
        case .rideLocation:
            return(
                AnyView(RideLocation().environmentObject(rideService)
                    .environmentObject(mainBuilderVM)
                )
            )
        case .selectDrivers:
            return(
                AnyView(SelectDrivers().environmentObject(manager)
                    .environmentObject(mainBuilderVM)
                )
            )
        case .rideOverView:
            return(
                AnyView(RideOverView().environmentObject(manager)
                    .environmentObject(rideService)
                    .environmentObject(mainBuilderVM)
                    .environmentObject(balance)

                )
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
