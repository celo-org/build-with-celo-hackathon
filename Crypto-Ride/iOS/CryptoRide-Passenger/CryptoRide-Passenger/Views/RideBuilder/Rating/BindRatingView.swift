//
//  BindRatingView.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 11/1/22.
//

import SwiftUI

struct BindRatingView: View {
    @Binding var rating:Int
    
    var label = ""
    var disabled = false
    var maximumRating = 5
    
    var offImage:Image?
    var onImage = Image(systemName: "star.fill")
    
    var offColor = Color.gray
    var onColor = Color.yellow
    
    var body: some View {
        HStack{
            if label.isEmpty == false {
                Text(label)
            }
            ForEach(1..<maximumRating + 1, id :\.self ){ number in
                image(for: number)
                    .foregroundColor(number > rating ? offColor : onColor)
                    .onTapGesture {
                        self.rating = number
                    }.disabled(disabled)
                
            }
    
        }
        .gesture(
            // TODO add drag gesture
            DragGesture()
            .onChanged { gesture in
                //print(gesture)
            }
            .onEnded{ end in
               // print(end)
                
            })
    }
    
    func image(for number: Int) -> Image {
        if number > rating {
            return offImage ?? onImage
        }else{
            return onImage
        }
    }
}
