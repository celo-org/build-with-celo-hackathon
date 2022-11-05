//
//  ProfileView.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/21/22.
//

import SwiftUI


struct ProfileView: View {
    
    @EnvironmentObject var registered:Registered
    @EnvironmentObject var balance:Balance
    @EnvironmentObject var driver:Driver
    @EnvironmentObject var manager:LocationManager
    
    enum setView{
        case profile
        case car
        case rate
        case fund
    }
    
    @State var currentView = setView.profile

    @StateObject var profileVM = ProfileViewModel()
    @State var isLoading = false
    @State var isTransfer = false
    
    var body: some View {
        
        VStack{
            if registered.isRegistered == false {
                switch(currentView){
                case setView.profile:
                    ProfileRegistration().environmentObject(profileVM)
                case setView.car:
                    CarRegistration().environmentObject(profileVM)
                case setView.rate:
                    RateRegistration().environmentObject(profileVM)
                case setView.fund:
                    FundRegistration().environmentObject(profileVM)
                                      .environmentObject(balance)
                    
                }
                HStack{
                    Spacer()
                   
                    Button{
                        switch(currentView){
                        case setView.profile:
                            currentView = setView.car
                        case setView.car:
                            currentView = setView.rate
                        case setView.rate:
                            currentView = setView.fund
                        case setView.fund:
                            isLoading = true
                            
                            let car = profileVM.registerNewDriver.vehicle.year + " " +
                            profileVM.registerNewDriver.vehicle.color
                            + " " +
                            profileVM.registerNewDriver.vehicle.makeModel
                            // set default settings for new driver
                            let defaults = UserDefaults.standard
                            defaults.set(profileVM.registerNewDriver.profile.twitterHandle, forKey: "twitter")
                            defaults.set(profileVM.registerNewDriver.profile.instagramHandle, forKey: "instagram")

                            profileVM.registerDriver(rate:profileVM.registerNewDriver.rate.fare, name: profileVM.registerNewDriver.profile.name, car: car) { success in
                                isLoading = false
                                registered.isRegistered = true
                            }
                        }
                        
                    }label: {
                        if currentView == .fund{
                            HStack{
                                if isLoading{
                                    ProgressView()
                                }
                                Image(systemName: "paperplane.fill")
                                Text("Send")
                            }
                        }else{
                            HStack{
                                Image(systemName: "chevron.forward.square.fill")
                                Text("Next")
                            }
                        }
                        
                    }.buttonStyle(.borderedProminent)
                    .disabled(isLoading)
                }
                
            }else{
                if profileVM.driverInfo != nil {
                    ScrollView {
                    VStack(alignment:.center){
                        VStack {
                            VStack(spacing:8){
                                Text(driver.name).font(.title)
                                Text(driver.car).font(.title3)
                                Text("Rating ")
                                RatingView(rating:$driver.rating)
                           
                                Text("Reputation")
                                Text(driver.reputation)
                            
                                Text("Total Rides")
                                Text(driver.rideCount)
                            
                            }.padding()
                            HStack{
                                Text("$\(balance.cUSD) cUSD")
                            }.padding()
                            
                        }
                        Divider()
                        VStack {
                            Text("To Address").font(.title3)
                            HStack{
                                TextField("0x00", text: $profileVM.toAddress)
                                Button(action:{
                                    profileVM.toAddress = UIPasteboard.general.string ?? ""
                                }, label: {
                                    Image(systemName: "doc.on.clipboard")
                                })
                            }
                            Text("Send cUSD").font(.title3)
                            HStack{
                                
                                TextField("0", text:  $profileVM.amount)
                                Button(action:{
                                    profileVM.amount = balance.cUSD
                                }, label: {
                                    Text("MAX")
                                })
                            }
                            Button(action:{
                                isTransfer = true
                                profileVM.transfer(){ success in
                                    balance.getTokenBalance()
                                    profileVM.amount = ""
                                    profileVM.toAddress = ""
                                    isTransfer = false
                                }
                            }, label: {
                                Text("Send")
                            }).disabled(profileVM.toAddress.isEmpty || profileVM.amount.isEmpty || isTransfer )
                            
                        }
                        Divider()
                        Text("Receive").font(.title3)
                        
                        Button(action: {
                            UIPasteboard.general.string = ContractServices.shared.getWallet().address
                        }, label: {
                            Image(uiImage:profileVM.generateQRCode(from: ContractServices.shared.getWallet().address))
                                .resizable()
                                .interpolation(.none)
                                .scaledToFit()
                                .padding()
                                .frame(width: 230, height: 230)
                        })
                        Text(ContractServices.shared.getWallet().address).font(.body).bold().lineLimit(2)
                        
                    }.textFieldStyle(.roundedBorder)
                        .padding(EdgeInsets(top: 8, leading: 16,
                                               bottom: 8, trailing: 16))
                        .buttonStyle(.borderedProminent)
                    }
                }else{
                    ProgressView()
                }
            }

        } .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                NavigationLink(destination: Settings().environmentObject(registered)
                                                         .environmentObject(balance)
                                                         .environmentObject(driver)
                                                         .environmentObject(profileVM)
                ){
                    Image(systemName: "gear")
                }
            }
        }
    }
}

struct ProfileView_Previews: PreviewProvider {
    static var previews: some View {
        ProfileView()
    }
}
