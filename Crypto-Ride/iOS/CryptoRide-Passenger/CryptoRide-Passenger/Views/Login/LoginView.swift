//
//  LoginView.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 10/28/22.
//

import SwiftUI

struct LoginView: View {
    @StateObject private var loginVM = LoginViewModel()
    @EnvironmentObject var authentication:Authentication
    
    var body: some View {
        ZStack(alignment: .top) {
            
            VStack(alignment: .center) {
                Text("CryptoRide").font(.title).bold().padding()
                Text("Passenger").font(.title3).bold().padding()
                
                Spacer()
                
                VStack(alignment: .leading,spacing: 10){
                    Text(loginVM.hasKeyStore ? "Login":"Create New Wallet").font(.title)
                    Text(loginVM.hasKeyStore ? "Password":"New Password").font(.title2)
                        .font(.subheadline)
                        .bold()
                    TextField("",text: $loginVM.credentials.password)
                    Button{
                        loginVM.login {success in
                                // Update validation
                                //if loginVM.hasKeyStore {
                                authentication.updateValidation(success: success)
                                //}
                            }
                    }label: {
                        Text("login")
                    }
                }.padding([.leading, .trailing], 20)
                Spacer()
                HStack{
                    Spacer()
                    //Button("New Wallet"){
                    //    print("off")
                    //}
                    Button("Import Wallet"){
                        print("import wallet")
                    }
                }.padding()
          
            }

        }.textFieldStyle(.roundedBorder)
            .buttonStyle(.borderedProminent)
        
        
        
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                NavigationLink(destination: ProfileView()
                ){
                    Text("Import Wallet")
                }
            }
        }
        .navigationTitle("Crypto Driver")
        .navigationViewStyle(StackNavigationViewStyle())
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView()
    }
}
