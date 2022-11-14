//
//  ProgressState.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/30/22.
//

import SwiftUI

struct ProgressState: View {
    var body: some View {
        VStack{
            Spacer()
            ProgressView()
            Spacer()
        }
    }
}

struct ProgressState_Previews: PreviewProvider {
    static var previews: some View {
        ProgressState()
    }
}
