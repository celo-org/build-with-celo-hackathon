//
//  PassengerPickUp.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 11/1/22.
//

import SwiftUI

// MARK: PassengerPickUp
struct PassengerPickUp: View {
    // Environment Object
    @EnvironmentObject var rideService:RideService
    @State var isLoading = false
    
    var body: some View {
        VStack{
 
            Spacer()
            VStack{
                if isLoading {
                    ProgressView().tint(.blue)
                }
                HStack{
             
                    Button(action: {
                        isLoading = true
                        rideService.passengerConfirmsPickUp() {
                            result in
                            // wait for event
                        }
                    }, label: {
                        Text("Confirm PickUp")
                    }).buttonStyle(.borderedProminent)
                        .disabled(isLoading)
                }
                
                HStack{
                    Spacer()
                    Text("Current Task:").font(.title2).bold()
                    Text("Passenger Pick Up").font(.headline).padding()
                    Spacer()
                }
            }.background(.bar)
                .padding()
                .cornerRadius(15)

        }
    }
}

struct PassengerPickUp_Previews: PreviewProvider {
    static var previews: some View {
        PassengerPickUp()
    }
}
