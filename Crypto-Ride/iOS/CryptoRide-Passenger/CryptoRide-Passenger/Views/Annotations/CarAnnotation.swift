//
//  CarAnnotation.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 10/29/22.
//

import Foundation
import MapKit
import UIKit

// MARK: CarAnnotation
class CarAnnotation : NSObject, MKAnnotation {
    dynamic var coordinate: CLLocationCoordinate2D
    dynamic var title: String?
    dynamic var subtitle: String?
    dynamic var image: UIImage?
    dynamic var color: UIColor?

    override init() {
        self.coordinate = CLLocationCoordinate2D()
        self.title = nil
        self.subtitle = nil
        self.image = nil
        self.color = UIColor.white
    }
}
// MARK: CarAnnotationView
// Driver annotation view displayed as a car
class CarAnnotationView: MKAnnotationView {
    private var imageView: UIImageView!

    override init(annotation: MKAnnotation?, reuseIdentifier: String?) {
        super.init(annotation: annotation, reuseIdentifier: reuseIdentifier)

        self.frame = CGRect(x: 0, y: 0, width: 44, height: 44)
        self.imageView = UIImageView(image:  UIImage(named: "car.circle"))
        self.addSubview(self.imageView)
        self.imageView.layer.cornerRadius = 5.0
        self.imageView.layer.masksToBounds = true
    }

    override var image: UIImage? {
        get {
            return self.imageView.image
        }

        set {
            self.imageView.image = newValue
        }
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}

