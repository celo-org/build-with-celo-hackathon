//
//  NBRatingView.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 11/9/22.
//


import SwiftUI

// MARK: NBRatingView
// Non binding rating view
struct NBRatingView: View {

    var rating:Int
    
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
                
            }
    
        }

    }
    
    func image(for number: Int) -> Image {
        if number > rating {
            return offImage ?? onImage
        }else{
            return onImage
        }
    }
}
