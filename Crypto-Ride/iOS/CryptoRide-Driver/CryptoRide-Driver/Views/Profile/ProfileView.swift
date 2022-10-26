//
//  ProfileView.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/21/22.
//

import SwiftUI

struct ProfileView: View {
    
    @State var isRegistered:Bool
    enum setView{
        case profile
        case car
        case rate
        case fund
        case sendTx
    }
    
    @State var currentView = setView.profile

    @StateObject var profileVM = ProfileViewModel()
    
    var body: some View {
        
        VStack{
            if !isRegistered {
                switch(currentView){
                case setView.profile:
                    ProfileRegistration().environmentObject(profileVM)
                case setView.car:
                    CarRegistration().environmentObject(profileVM)
                case setView.rate:
                    RateRegistration().environmentObject(profileVM)
                case setView.fund:
                    FundRegistration().environmentObject(profileVM)
                case setView.sendTx:
                    SendRegistration()
                        .environmentObject(profileVM)
                }
                
                Button{
                    switch(currentView){
                    case setView.profile:
                        currentView = setView.car
                    case setView.car:
                        currentView = setView.rate
                    case setView.rate:
                        currentView = setView.fund
                    case setView.fund:
                        currentView = setView.sendTx
                    case setView.sendTx:
                        profileVM.registerDriver() { success in
                            print("success")
                            
                        }
                        //currentView = setView.sendTx
                    }
                    
                }label: {
                    // CHECK IF ACCOUNT BALANCE HAS ENOUGH TO SEND TX
                    
                    Text("Next")
                }
            }else{
                if profileVM.driverInfo != nil {
                    VStack{
                        Text("Driver address " + profileVM.driverInfo!.address!)
                        Text("Is registered " + String(profileVM.driverInfo!.isDriver!))
                        Text("Profile asset " + profileVM.driverInfo!.infoAssetLink!)
                        Text("Car asset " +  profileVM.driverInfo!.carAssetLink!)
                        Text("Current Rate" + profileVM.driverInfo!.rate!.description)
                        Button{
                            // TODO Add rate change
                            print("Rate changes")
                        }label: {
                            Text("Change Rate")
                        }
                        
                    }
                }else{
                    ProgressView()
                }


                
            }

        }

            
            
            
                //}
            //Spacer()
            //
                //Menu("Driving Rates") {
            //
                //}
                
            //}
            
            //if profileVM.driverInfo != nil {
            //    Text("Current Rate: \(rate)")
            //    Text("Is Driver: \(profileVM.driverInfo!.isDriver!)" as String)
            //    Text("")
            //}

            
            //Button {
            //}label: {
            //    Text("Update Rate ")
            //}


    }
}

struct ProfileView_Previews: PreviewProvider {
    static var previews: some View {
        ProfileView(isRegistered: true)
    }
}
