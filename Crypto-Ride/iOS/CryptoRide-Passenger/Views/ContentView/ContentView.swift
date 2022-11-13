//
//  ContentView.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 9/14/22.
//

import SwiftUI
import MapKit
import Combine


struct ContentView: View {

    enum States {
        case buildingRide
        case selectDriver
        case rideOverView
        case none // Passenger is entered a ride
    }
    
    @EnvironmentObject var authentication:Authentication
    
    @State private var viewState:States = .buildingRide
    
    @ObservedObject var manager = LocationManager()
    @ObservedObject var rideService = RideService()
    @ObservedObject var webSocket = WebSockets()
    
    @StateObject var balanceVM = BalanceViewModel()
    
    let mapView:MapView = MapView()
    let contentVM = ContentViewModel()
    
    
    func textForState() -> String {
        switch(rideService.ride!.rideState){
        case 1:
            return("Waiting for Driver to Accept")
        case 2:
            return("Confirm pickup")
        case 3:
            return("Waiting for driver to confirm drop off")
        case 4:
            return("Confirm drop Off")
        default:
            return("undefined ride state")
        }
    }
    

    var body: some View {
        
        NavigationView {
            ZStack{
            
                mapView
                    .environmentObject(rideService)
                    .environmentObject(manager)
                    .edgesIgnoringSafeArea(.all)
                    
                // Check if ride is empty
                if rideService.ride != nil {
                    // Views for progressing or canceling a ride
                    VStack(alignment: .center){
                        HStack{
                            Button {
                                rideService.cancelRide()
                            }label: {
                                Text("Cancel Ride")
                            }.buttonStyle(.borderedProminent)
                                .tint(.red)
                            Spacer()
                        }
                        Spacer()
                        
                        Button{
                            switch(rideService.ride!.rideState){
                            case 1:
                                // Drivers accepts ride
                                break
                            case 2:
                                
                                print("Confirm pickup")
                                rideService.passengerConfirmsPickUp()
                                
                            case 3:
                                // Driver confirms dropoff
                                break
                            case 4:
                                
                                print("Confirm drop Off")
                                rideService.passengerConfirmsDropOff()
                                
                            default:
                                break
                            }
                        }label: {
                            Text(textForState())
                        }.buttonStyle(.borderedProminent)
                        
                    }
        
                         
                }else if (viewState != .none){
                    // Views for building a ride
                    VStack{
                                            
                        containedView()
                        HStack{
                            Button {
                                changeRideBuildState( back: true)
                            } label: {
                                if(viewState != .buildingRide){
                                    Image(systemName:"arrow.backward.square.fill")
                                }
                                
                            }.buttonStyle(.bordered)
                            Spacer()
                            Button {
                                changeRideBuildState( back: false)
                            } label: {
                                if(viewState == .rideOverView){
                                    Image(systemName:"paperplane.fill").disabled(rideService.currentApprovedAmount == nil)
                                }else{
                                    Image(systemName:"arrow.right.square.fill")
                                }
                                
                            }.buttonStyle(.bordered)
                        }.background(.bar)
                        
                    }
                    
                }else{
                    // Loading view between in ride and creating a ride
                    ProgressView()
                }
                    
            }
            .safeAreaInset(edge: .top, content: {
                Color.clear
                    .frame(height: 0)
                    .background(.bar)
                    .border(.black)
            })
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                        Button("Logout") {
                            //webSocket.disconnectSocket()
                            authentication.updateValidation(success: false)
                        }
                    }
                ToolbarItem(placement: .navigationBarTrailing) {
                    NavigationLink(destination: ProfileView().environmentObject(balanceVM)
                    ){
                        
                        Image(systemName: "person.crop.circle")
                    }
                }
            }
            .navigationTitle("Passenger")
            .navigationViewStyle(StackNavigationViewStyle())
            .navigationBarTitleDisplayMode(.inline)
        }
    }
    
    func changeRideBuildState(back:Bool) {
    
        switch(viewState){
        case .buildingRide:
            if back {return}
            viewState = .selectDriver
        case .selectDriver:

            if back {
                viewState = .buildingRide
            }else{
                // Snap map to the route
                manager.snapToRoute = true
                rideService.getAllowance(address: ContractServices.shared.getWallet().address)
                viewState = .rideOverView
            }
        case .rideOverView:
           
            if back {
                viewState = .selectDriver
            }else {
                viewState = .buildingRide
                let onlyAddress = manager.drivers.map { $0.address }
       
                rideService.broadCastRide(startLocation: rideService.startLocation!, endLocation: rideService.endLocation!, driverlist: onlyAddress, ridePrice: manager.normalizedPrice) { success in
                    rideService.getActiveRide(address: ContractServices.shared.getWallet().address)
                }
                viewState = .none
            }
            
        case .none:
            //if back
            print("None")
            
            // TODO Change approval to profile view
          
        //case .waitForRide:
        //    print("Waiting for ride")
        }
    }
        
    
    func containedView() -> AnyView {
            switch viewState {
            case .buildingRide: return AnyView(RideLocation().environmentObject(rideService))
            case .selectDriver: return AnyView(SelectDrivers().environmentObject(manager))
            case .rideOverView: return AnyView(RideOverView().environmentObject(manager)
                                                             .environmentObject(rideService))
            case .none: return AnyView(ProgressView())
        
         }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
