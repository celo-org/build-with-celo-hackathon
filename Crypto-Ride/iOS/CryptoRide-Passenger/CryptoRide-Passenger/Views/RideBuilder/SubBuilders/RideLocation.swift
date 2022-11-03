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
    @EnvironmentObject var builderVm:MainBuilderViewModel

    
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
                                // Try updating route every pin drop
                                ride.updateRoute = true
                                // Match pin drop screen location to mapView coords
                                if(ride.showDropOnStart){
                                    ride.startDropLocation = CGPoint(x: geo.frame(in: .global).midX, y: geo.frame(in: .global).maxY)
                                }else if(ride.showDropOnEnd){
                                    ride.endDropLocation = CGPoint(x: geo.frame(in: .global).midX, y: geo.frame(in: .global).maxY)
                                }
                                
                            }
                    }.frame(width: 50, height: 50, alignment: .center)
                }


           
            Spacer()
                HStack{
                    Spacer()
                    Button(action:{
                        builderVm.builderStates = .selectDrivers
                    } , label: {
                        Image(systemName: "chevron.right")
                    }).padding()
                    .buttonStyle(.borderedProminent)
                }
            VStack{
                if (ride.showDropOnStart || ride.showDropOnEnd){
            
         
                }else{
    
                    Text("Where would you like to go?").font(.subheadline)
                        .bold()
                    HStack{
                        TextField("Pickup",text: $ride.humanStartLocation)
                        Button {
                            ride.userLocation = true
                            ride.updateRoute = true
                        } label: {
                            Image(systemName: "location.square.fill")
                                .foregroundColor(.white)
                            
                        }
                        Button {
                            ride.showDropOnStart = true
                            //ride.updateRoute = true
                        } label: {
                            Image(systemName: "mappin")
                               
                                .foregroundColor(.white)
                        }
                    }
                    
                    
                    HStack{
                        TextField("Drop-off",text: $ride.humanEndLocation)
                        
                        Button {
                            ride.showDropOnEnd = true
                            //ride.updateRoute = true
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
