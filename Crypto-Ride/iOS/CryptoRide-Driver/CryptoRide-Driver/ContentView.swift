//
//  ContentView.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/21/22.
//

import SwiftUI

struct ContentView: View {
    
    @EnvironmentObject var authentication:Authentication
    @StateObject var manager = LocationManager()
    
    @ObservedObject var webSocket = WebSockets()
    
    @State var isRegistered = false
    @State var isLoading = false
    
    let mapView:MapView = MapView()
    var body: some View {
        NavigationView {
            ZStack {
                    mapView
                        .environmentObject(manager)
                        .edgesIgnoringSafeArea(.all)
                
                VStack{
                    Spacer()
                    if isRegistered{
                        Button{
                            manager.isActive.toggle()
                        }label:{
                            
                            if manager.isActive{
                                Text("Stop")
                            }else{
                                Text("Start")
                            }
                            
                        }
                    }else{
                        VStack{
                            Text("Looks like you havn't registered this wallet yet").font(.title3)
                            NavigationLink(destination: ProfileView(isRegistered: isRegistered)
                            ){
                                Image(systemName: "person.crop.circle")
                                Text("Register Wallet")
                            }
                        }.background(.ultraThinMaterial)
                        Spacer()
                    }
                    // Must need to reqgister before accepting rides
                }.disabled(isLoading)
                //ProgressView().disabled(isLoading)
                
                if webSocket.newAnnounceRide != nil {
                    VStack{
                        Text("New Ride").font(.title3)
                        Button{
                            
                        }label: {
                            Text("Show Ride")
                        }
                        Button{
                            webSocket.newAnnounceRide = nil
                        }label: {
                            Text("Dismiss")
                        }
                    }.tint(.accentColor)
                }
                
            }.task {
                
                isLoading = true
                let ethAddress = ContractServices.shared.getWallet()
                
                let params = [ethAddress.address] as [AnyObject]
                
                ContractServices.shared.read(contractId: Contracts.RideManager, method: "isDriver", parameters : params)
                { result in
                    DispatchQueue.main.async { [self] in
                        isLoading = false
                        switch(result){
                        case .success(let result):
                            let number = result["0"] as! NSNumber
                            
                            isRegistered = Bool(exactly: number)!
                            print("Is registered \(isRegistered)")
                        case .failure(let error):
                            print(error)
                            //self.error = ContractError(title: "Failed to get balance.", description: error.errorDescription)
                        }
                    }
                }
                
            }
            .buttonStyle(.borderedProminent)
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
                    NavigationLink(destination: ProfileView(isRegistered: isRegistered)
                    ){
                        Image(systemName: "person.crop.circle")
                    }
                }
            }
            .navigationTitle("")
            .navigationViewStyle(StackNavigationViewStyle())
            .navigationBarTitleDisplayMode(.inline)
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
