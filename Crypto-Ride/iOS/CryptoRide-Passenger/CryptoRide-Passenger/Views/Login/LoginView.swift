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
    
    
    @State private var animateGradient = false
    var body: some View {
        ZStack(alignment: .top) {
            LinearGradient(colors: [Color("PrimaryGreen"), Color("CeloGold")], startPoint: animateGradient ? .topLeading : .bottomLeading, endPoint: animateGradient ? .bottomTrailing : .topTrailing)
                .ignoresSafeArea()
                .onAppear {
                    withAnimation(.linear(duration: 8.0).repeatForever(autoreverses: true)) {
                        animateGradient.toggle()
                    }
                }
            .edgesIgnoringSafeArea(.all)
            
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
                    HStack{
                        Spacer()
                        if loginVM.showProgressView{
                            ProgressView().tint(.blue)
                            Spacer()
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
                    }
    
                }.padding([.leading, .trailing], 20)
                Spacer()
                VStack{
                    Text("Powered By").font(.subheadline).bold().lineLimit(2)
                    Image("CeloLight")
                        .resizable()
                        .scaledToFit()
                        .frame(width: 80, height: 30, alignment: .center)
                }

            }

        }.textFieldStyle(.roundedBorder)
            .buttonStyle(.borderedProminent)
        
        .navigationTitle("Crypto Passenger")
        .navigationViewStyle(StackNavigationViewStyle())
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView()
    }
}