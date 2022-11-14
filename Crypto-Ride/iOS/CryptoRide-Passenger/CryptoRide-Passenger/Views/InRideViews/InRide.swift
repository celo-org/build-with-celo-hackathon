//
//  InRide.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 11/1/22.
//

import SwiftUI

// MARK: Rating
/// Driver rating submitted by passenger
class Rating:ObservableObject{
    @Published var driverRating = 3
}

// MARK: InRide
/// Switch between views based on ride state
struct InRide: View {
    // Environment Objects
    @EnvironmentObject var rideService:RideService
    @EnvironmentObject var webSocket:WebSockets
    @EnvironmentObject var manager:LocationManager
    @EnvironmentObject var balance:Balance
    // States
    @StateObject var rating = Rating()
    @State var isLoading = false
    
    // MARK: nextView
    /// Presents the next view based on the current ride state
    func nextView() -> AnyView {
        switch rideService.ride.rideState {
        case 0:
            // Between ride states show progress view
            return AnyView(ProgressView().tint(.blue))
        case 1:
            return AnyView(AnnouncedRideView()
                .environmentObject(rideService)
                .environmentObject(webSocket)
                .environmentObject(manager)
            )
        case 2:
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
            if rideService.ride.rideState != 6 && rideService.ride.rideState != 5 && rideService.ride.rideState != 0 {
                HStack{
                    Button {
           
                        isLoading = true
                        rideService.cancelRide(){ success in
                            isLoading = false
                            rideService.ride = Ride()
                            manager.cleanMapView()
                            
                        }
                    }label: {
                        Text("Cancel Ride")
                        ProgressView()
                            .tint(.red)
                            
                    }.buttonStyle(.borderedProminent)
                        .tint(.red)
                        .disabled(isLoading )
       

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
