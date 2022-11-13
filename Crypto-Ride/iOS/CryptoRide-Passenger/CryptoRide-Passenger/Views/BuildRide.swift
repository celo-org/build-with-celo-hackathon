//
//  BuildRide.swift
//  
//
//  Created by mitchell tucker on 9/14/22.
//

import Foundation
import SwiftUI


struct BuildRide:View {
    
    @State private var startLocation:String = ""
    @State private var stopLocation:String = ""
    @EnvironmentObject var ride:Ride
    // TODO: reverse geo lookup from human to long lat
    
    var body: some View {

        VStack{
            TextField("Start",text: $startLocation)
            TextField("End",text:$stopLocation)
            
        }
        .textFieldStyle(.roundedBorder)
        .padding(EdgeInsets(top: 8, leading: 16,
                            bottom: 8, trailing: 16))

    }
    
}

struct BuildRide_Previews: PreviewProvider {
    static var previews: some View {
        BuildRide()
    }
}
