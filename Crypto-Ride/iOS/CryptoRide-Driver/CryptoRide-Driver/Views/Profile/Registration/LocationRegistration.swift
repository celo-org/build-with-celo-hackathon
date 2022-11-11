//
//  LocationRegistration.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 11/8/22.
//

import SwiftUI

struct LocationRegistration: View {
    @EnvironmentObject var driver:Driver
    @Environment(\.dismiss) var dismiss

    var body: some View {
        VStack{

            Spacer()
            Image(systemName: "mappin.and.ellipse")
                .resizable()
                .frame(width: 50.0, height: 50.0)
            
            
            Spacer()
            
        }.textFieldStyle(.roundedBorder)
            .disableAutocorrection(true)
            .padding()
       
    }
}

struct LocationRegistration_Previews: PreviewProvider {
    static var previews: some View {
        LocationRegistration()
    }
}
