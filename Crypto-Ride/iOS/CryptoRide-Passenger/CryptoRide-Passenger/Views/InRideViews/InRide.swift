//
//  InRide.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 11/1/22.
//

import SwiftUI

class Rating:ObservableObject{
    @Published var driverRating = 3
}


struct InRide: View {
    

    @EnvironmentObject var rideService:RideService
    @EnvironmentObject var webSocket:WebSockets
    @EnvironmentObject var manager:LocationManager
    @EnvironmentObject var balance:Balance
    
    @StateObject var rating = Rating()
    
    
    @State var isLoading = false
    
    func nextView() -> AnyView {
        switch rideService.ride.rideState {
        case 0:
            return AnyView(ProgressView().tint(.blue))
        case 1:
            return AnyView(AnnouncedRide()
                .environmentObject(rideService)
                .environmentObject(webSocket)
            )
        case 2:
            //manager.selectedDriver =
            //manager.selectedAnnotation = nil
            return AnyView(PassengerPickUp()
                .environmentObject(rideService)
                .environmentObject(webSocket)
            
            )
        case 3:
            return AnyView(DriverDropOff()

            )
        case 4:
            return AnyView(PassengerDropOff()
                .environmentObject(rating)
            )
        case 5:
            return AnyView(Complete()
                .environmentObject(rideService)
                .environmentObject(manager)
            )
        case 6:
            return AnyView(Canceled()
                .environmentObject(rideService)
                .environmentObject(manager)
            )
        default:
            return AnyView(Text("Unkown State"))
         }
    }
    
    var body: some View {
      
        
        // Views for progressing or canceling a ride
        VStack(alignment: .center){
            // hide Cancel button if ride is over or was canceled
            if rideService.ride.rideState != 6 || rideService.ride.rideState != 5{
                HStack{
                    Button {
                        
                        rideService.humanStartLocation = ""
                        rideService.humanEndLocation = ""
                        isLoading = true
                        rideService.cancelRide(){ success in
                            isLoading = false
                            rideService.ride = Ride()
                            manager.cleanMapView()
                            rideService.passengerState = .noRide
                        }
                    }label: {
                        Text("Cancel Ride")
                        ProgressView()
                            .tint(.red)
                            
                    }.buttonStyle(.borderedProminent)
                        .tint(.red)
                        .disabled(isLoading)
       

                    Spacer()
                }
            }
            Spacer()
            nextView().disabled(isLoading)
        }
    }
}

struct InRide_Previews: PreviewProvider {
    static var previews: some View {
        InRide()
    }
}
