//
//  ContentView.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/21/22.
//

import SwiftUI

struct ContentView: View {
    
    @StateObject var manager = LocationManager()
    @State var isLogin = true
    
    
    
    let mapView:MapView = MapView()
    var body: some View {
        NavigationView {
            ZStack {
                if isLogin{
                    mapView
                        .environmentObject(manager)
                        .edgesIgnoringSafeArea(.all)
                }else{
                    DriverRegistration()
                }
                Button{
                    manager.isActive.toggle()
                }label:{
                    if manager.isActive{
                        Text("Stop")
                    }else{
                        Text("Start")
                    }
                    
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
                    NavigationLink(destination: ProfileView()
                    ){
                        
                        Image(systemName: "person.crop.circle")
                    }
                }
            }
            .navigationTitle("Map")
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
