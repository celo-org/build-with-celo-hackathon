//
//  SelectDrivers.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 9/15/22.
//

import Foundation
import SwiftUI



struct SelectDrivers:View {

    @EnvironmentObject var lm:LocationManager
    @State private var editMode = EditMode.active
    
    var body: some View {
        VStack{
            if(lm.selectedDrivers != nil) {
                VStack{
                    Text("Driver Profile")
                       
                    HStack{
                        Text("Twitter")
                        Text("Facebook")
                        Text("instagram")
                    }
                }.background(.white)
            }
            Spacer()
                
                List {
                    ForEach(lm.drivers.indices, id: \.self) { index in
                        Button {
                            lm.selectedDrivers = lm.drivers[index]
                            print("Selected \(lm.drivers[index].address)")
                            print(lm.drivers[index].rateAppliedToRide)
                        } label: {
                            Text(lm.drivers[index].address)
                            if lm.drivers[index].rateAppliedToRide != nil {
                                let rate:String = String(format: "%.1f", lm.drivers[index].rateAppliedToRide!)
                                Text(rate)
                            }
                        }
                    }.onMove(perform: move)
                }.frame(height: 200)
                .environment(\.editMode, $editMode)
                
            
        }
    }
    
    func move(from source: IndexSet, to destination: Int) {
        lm.drivers.move(fromOffsets: source, toOffset: destination)
     }
    
}

struct SelectDrivers_Previews: PreviewProvider {
    static var previews: some View {
        SelectDrivers()
    }
}
