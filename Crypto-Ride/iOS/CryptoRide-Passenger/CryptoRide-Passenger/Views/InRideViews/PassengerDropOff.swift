//
//  PassengerDropOff.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 11/1/22.
//

import SwiftUI

// MARK: PassengerDropOff
struct PassengerDropOff: View {
    // Loading
    @State var isLoading = false
    @State var confirmDropOff = false

    @EnvironmentObject var rating:Rating
    @EnvironmentObject var rideService:RideService
    
    var body: some View {
        VStack{
            if isLoading {
                ProgressView().tint(.blue)
            }
            if confirmDropOff && isLoading == false{
                Spacer()
                VStack{
                    Text("Driver Rating").font(.title2).bold()
                    BindRatingView(rating:$rating.driverRating).padding()
                    HStack(alignment: .bottom, spacing: 20){
        
                        Button(action: {
                            confirmDropOff.toggle()
                        }, label: {
                            Text("Dismiss")
                        }).padding()
                        
                        Button(action: {
                            isLoading = true
                            rideService.passengerConfirmsDropOff(rating: rating.driverRating) {
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
                Spacer()
            }else{
                VStack{
                    HStack{
                 
                        Button(action: {
                            confirmDropOff.toggle()
                        }, label: {
                            Text("Confirm Drop Off")
                        }).disabled(confirmDropOff)
                    }
                    
                    HStack{
                        Spacer()
                        Text("Current Task:").font(.title2).bold()
                        Text("Confirm drop off").font(.headline).padding()
                        Spacer()
                    }
                }.background(.bar)
                    .padding()
                    .cornerRadius(15)
            }
           
        }
    }
}

struct PassengerDropOff_Previews: PreviewProvider {
    static var previews: some View {
        PassengerDropOff()
    }
}
