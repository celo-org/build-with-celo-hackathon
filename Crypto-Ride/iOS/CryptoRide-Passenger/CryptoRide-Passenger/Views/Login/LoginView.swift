//
//  LoginView.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 10/28/22.
//

import SwiftUI

// MARK: LoginView
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
                    Text(loginVM.hasKeyStore ? "Password":"New Password")
                        .font(.subheadline)
                        .bold()
                    TextField("",text: $loginVM.credentials.password)
                    if loginVM.showProgressView{
                        ProgressView().tint(.blue)
                    }else{
                        Button{
                            loginVM.showProgressView = true
                            loginVM.login {success in
                                    // update validation
                                    authentication.updateValidation(success: success,password:loginVM.credentials.password)
                                    loginVM.showProgressView = false
                                }
                        }label: {
                            Text("login")
                        }
                    }

                }.padding([.leading, .trailing], 20)
                Spacer()
          
            }

        }.textFieldStyle(.roundedBorder)
            .buttonStyle(.borderedProminent)
        
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
