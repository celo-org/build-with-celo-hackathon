//
//  BuildRide.swift
//  
//
//  Created by mitchell tucker on 9/14/22.
//

import Foundation
import SwiftUI


struct RideLocation:View {
    
    @EnvironmentObject var ride:RideService
    //@EnvironmentObject var lm:LocationManager

    
    var body: some View {
        ZStack{
            
            VStack(){
                
                if(ride.showDropOnStart || ride.showDropOnEnd){
                    Spacer()
                    GeometryReader { geo in
                        
                        Image(systemName: "mappin")
                            
                            .resizable()
                            .scaledToFit()
                            .frame(width: 50, height: 50, alignment: .center)
                            .foregroundColor(.blue)
                            
                            .onTapGesture {
                                // Match pin drop screen location to mapView coords
                                if(ride.showDropOnStart){
                                    ride.startDropLocation = CGPoint(x: geo.frame(in: .global).midX, y: geo.frame(in: .global).maxY)
                                }else if(ride.showDropOnEnd){
                                    ride.endDropLocation = CGPoint(x: geo.frame(in: .global).midX, y: geo.frame(in: .global).maxY)
                                }
                                
                            }
                    }.frame(width: 50, height: 50, alignment: .center)
                        //.background(.black)
                }


           
            Spacer()
            VStack{
                if (ride.showDropOnStart || ride.showDropOnEnd){
                    //Button {
                    //    ride.showDropOnEnd = false
                    //    ride.showDropOnStart = false
                    //} label: {
                    //    Text("Done")
                    //}
     
         
                }else{
                    Text("Where would you like to go?").font(.subheadline)
                        .bold()
                    HStack{
                        TextField("Pickup",text: $ride.humanStartLocation)
                        Button {
                            ride.userLocation = true
                        } label: {
                            Image(systemName: "location.square.fill")
                                .foregroundColor(.white)
                            
                        }
                        Button {
                            ride.showDropOnStart = true
                            
                        } label: {
                            Image(systemName: "mappin")
                               
                                .foregroundColor(.white)
                        }
                    }
                    
                    
                    HStack{
                        TextField("Drop-off",text: $ride.humanEndLocation)
                        
                        Button {
                            ride.showDropOnEnd = true
                        } label: {
                            Image(systemName: "mappin")
                                .foregroundColor(.white)
                        }
                    }
                }
            
            }
            .textFieldStyle(.roundedBorder)
            .padding(EdgeInsets(top: 8, leading: 16,
                                bottom: 8, trailing: 16))
            .buttonStyle(.borderedProminent)
            .background(.bar)
            }
        }
    }
    
}

struct BuildRide_Previews: PreviewProvider {
    static var previews: some View {
        RideLocation()
    }
}
