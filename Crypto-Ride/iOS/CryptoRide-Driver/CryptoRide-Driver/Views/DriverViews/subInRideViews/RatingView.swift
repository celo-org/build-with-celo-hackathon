//
//  RatingView.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/31/22.
//

import SwiftUI

struct RatingView: View {
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
                        rating = number
                    }.disabled(disabled)
                
                
            }
    
        }
        .cornerRadius(15)
        .clipShape(Rectangle())
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

struct RatingView_Previews: PreviewProvider {
    static var previews: some View {
        RatingView(rating: .constant(4))
    }
}
