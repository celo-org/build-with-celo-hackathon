//
//  ContentView.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 9/14/22.
//

import SwiftUI
import MapKit



struct ContentView: View {

    enum States {
        case buildingRide
        case selectDriver
        case rideOverView
        case broadCastRide
 
    }
    @State private var viewState:States = .buildingRide
    
    @StateObject var rideService = RideService()
    @StateObject var manager = LocationManager()
    
    
    @StateObject var balanceVM = BalanceViewModel()
    
    let mapView:MapView = MapView()
    let contentVM = ContentViewModel()
    
    //@State var driverHandle = ""
    
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
                
                if rideService.ride != nil {
                    VStack(alignment: .center){
                        HStack{
                            Button {
                                // TODO is the user certin they want to cancel
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
                                break
                            case 2:
                            
                                print("Confirm pickup")
                                
                            case 3:
                                break
                            case 4:
                                
                                print("Confirm drop Off")
                                
                            default:
                                break
                            }
                        }label: {
                            Text(textForState())
                        }.buttonStyle(.borderedProminent)
                        
                    }
        
                         
                }else{
                    VStack{
                        Spacer()
                        
                        containedView()
                        
                        Button {
                            switch(viewState){
                                
                            case .buildingRide:
                                if rideService.startDropLocation == nil || rideService.endDropLocation == nil{
                                    print("Cant have empty")
                                    return
                                }
                                
                                viewState = .selectDriver
                                
                            case .selectDriver:
                                viewState = .rideOverView
                            case .rideOverView:
                                viewState = .broadCastRide
                            case .broadCastRide:
                                viewState = .buildingRide
                                let onlyAddress = manager.drivers.map { $0.address }
                                // TODO Change approval to profile view
                                rideService.setApproval() { success in
                                    
                                    rideService.broadCastRide(startLocation: rideService.startLocation!, endLocation: rideService.endLocation!, driverlist: onlyAddress, ridePrice: manager.normalizedPrice)
                                }
                               
                        
                            }
                        } label: {
                            Text("Next")
                        }.buttonStyle(.borderedProminent)
                        
                    } .padding(.bottom, 10)
                }
                    
            }
            .safeAreaInset(edge: .top, content: {
                Color.clear
                    .frame(height: 0)
                    .background(.bar)
                    .border(.black)
            })
            .toolbar {
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
        
    
    func containedView() -> AnyView {
            switch viewState {
            case .buildingRide: return AnyView(RideLocation().environmentObject(rideService))
            case .selectDriver: return AnyView(SelectDrivers().environmentObject(manager))
            case .rideOverView: return AnyView(RideOverView().environmentObject(manager))
            case .broadCastRide: return AnyView(BroadCastRide())
        
         }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
