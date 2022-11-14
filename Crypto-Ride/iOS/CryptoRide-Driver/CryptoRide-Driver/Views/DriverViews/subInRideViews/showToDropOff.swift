//
//  showToDropOff.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/31/22.
//

import SwiftUI
import MapKit

struct showToDropOff: View {
    
    let coordinates:CLLocationCoordinate2D
    let locationName:String
    
    @State var confirmDropOff = false
    
    @EnvironmentObject var rating:Rating
    @EnvironmentObject var rideService:RideService
    
    @State var isLoading = false
    
    init(_coordinates:CLLocationCoordinate2D,_locationName:String){
        self.coordinates = _coordinates
        self.locationName = _locationName
    }
    
    var body: some View {
        VStack{
            if isLoading {
                ProgressView().tint(.blue)
            }
            if confirmDropOff && isLoading == false{
                Spacer()
                VStack{
                    Text("Passenger Rating").font(.title2).bold()
                    RatingView(rating: $rating.driverRating).padding()
                    HStack(alignment: .bottom, spacing: 20){
        
                        Button(action: {
                            confirmDropOff.toggle()
                        }, label: {
                            Text("Dismiss")
                        }).padding()
                        
                        Button(action: {
                            isLoading = true
                            rideService.driverConfirmsDropOff(passengerRating: rating.driverRating) {
                                result in
                                
                                confirmDropOff = false
                                // wait for event
                            }
                        }, label: {
                            Text("Confirm")
                        }).padding()

                    }
                    
                }.background(.bar)
                    .padding()
                    .cornerRadius(15)
                    .clipShape(Rectangle())
                Spacer()
            }else{
                VStack{
                    HStack{
                    Button(action: {
                        GoogleMapApp().openWithDirection(cordinate: self.coordinates, locationName: locationName)
                    }, label: {
                        Text("Open route")
                        Image(systemName: "map")
                    })
                        
                        Button(action: {
                            confirmDropOff.toggle()
                        }, label: {
                            Text("Confirm Drop Off")
                        }).disabled(isLoading)
                    }
                    
                    HStack{
                        Spacer()
                        Text("Current Task:").font(.title2).bold()
                        Text("Take Passenger to drop off location.").font(.headline).padding()
                        Spacer()
                    }
                }.background(.bar)
                    .padding()
                    .cornerRadius(15)
                    .clipShape(Rectangle())
            }
           
        }
        
    }
}
