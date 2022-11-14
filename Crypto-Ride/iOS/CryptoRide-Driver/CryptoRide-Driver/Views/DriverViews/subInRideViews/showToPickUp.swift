//
//  showToPickUp.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/31/22.
//

import SwiftUI
import MapKit

struct showToPickUp: View {
    
    let coordinates:CLLocationCoordinate2D
    let locationName:String
    
    init(_coordinates:CLLocationCoordinate2D,_locationName:String){
        self.coordinates = _coordinates
        self.locationName = _locationName
    }
    
    var body: some View {
        VStack{
            Button(action: {
                GoogleMapApp().openWithDirection(cordinate: self.coordinates, locationName: self.locationName)
            }, label: {
                Text("Open route in maps")
                Image(systemName: "map")
            })
            HStack{
                Spacer()
                Text("Current Task:").font(.title2).bold()
                Text("Drive to pick up point.").font(.headline).padding()
                Spacer()
            }
  
        }
        .cornerRadius(15)
        .clipShape(Rectangle())
        .background(.bar)
            .padding()
    }
}

