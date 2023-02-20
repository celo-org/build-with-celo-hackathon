//
//  OpenMaps.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/31/22.
//
import Foundation
import CoreLocation
import UIKit
import MapKit

struct GoogleMapApp {
    func openWithDirection(cordinate: CLLocationCoordinate2D, locationName: String) {
        let hasGoogleMapApp = UIApplication.shared.canOpenURL(URL(string: "comgooglemaps://")!)

        if hasGoogleMapApp {
            let urlString = "comgooglemaps-x-callback://?saddr=&daddr=\(cordinate.latitude),\(cordinate.longitude)&directionsmode=driving"
            if let url = URL(string: urlString) {
                UIApplication.shared.open(url, options: [:])
            }
        } else {
            // If google map not installed, open with Apple Map App
            let mapItem = MKMapItem(placemark: MKPlacemark(coordinate: cordinate, addressDictionary: nil))
            mapItem.name = locationName
            mapItem.openInMaps(launchOptions: [MKLaunchOptionsDirectionsModeKey: MKLaunchOptionsDirectionsModeDriving])
        }
    }
}
