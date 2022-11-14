//
//  DriverRole.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/21/22.
//

import SwiftUI

struct DriverDetails {
    var name:String
    var rate:Int
}

struct DriverRegistration: View {
    
    @State var name:String = ""
    @State var rate:String = ""
    var body: some View {
        VStack {
            Text("Driver Registration")
            TextField("Name",text: $name)
            TextField("Rate",text: $rate)
        }.textFieldStyle(.roundedBorder)
    }
}
