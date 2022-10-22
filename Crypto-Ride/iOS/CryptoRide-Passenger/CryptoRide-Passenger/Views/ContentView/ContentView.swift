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
    
    private var ride = Ride()
    
    @StateObject var manager = LocationManager()
    @StateObject var balanceVM = BalanceViewModel()
    
    let mapView:MapView = MapView()
    let contentVM = ContentViewModel()
    
    var body: some View {
        
        NavigationView {
            ZStack{
                
                mapView
                    .environmentObject(ride)
                    .environmentObject(manager)
                    .edgesIgnoringSafeArea(.all)
                
                VStack{
                    Spacer()
                    
                    containedView()
                    
                    Button {
                        switch(viewState){
                            
                        case .buildingRide:
                            if ride.startDropLocation == nil || ride.endDropLocation == nil{
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
                            print("Sending")
                            print("Ride location")
                            print(ride.startLocation)
                            print(ride.endLocation)
                            print("Drivers list ")
                            print(manager.drivers) // TODO Only need drivers address
                            print("Price")
                            print(manager.normalizedPrice)
                        }
                    } label: {
                        Text("Next")
                    }.buttonStyle(.borderedProminent)
                    
                } .padding(.bottom, 10)
                    
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
            .navigationTitle(balanceVM.balance)
            .navigationViewStyle(StackNavigationViewStyle())
            .navigationBarTitleDisplayMode(.inline)
        }
    }
        
    
    func containedView() -> AnyView {
            switch viewState {
            case .buildingRide: return AnyView(RideLocation().environmentObject(ride))
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
