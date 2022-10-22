//
//  MapView.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/21/22.
//

import Foundation
import SwiftUI
import MapKit

struct MapView: UIViewRepresentable {
    typealias UIViewType = MKMapView
    
    let mapView = MKMapView()
    
    @EnvironmentObject var manager:LocationManager
    //@EnvironmentObject var ride:Ride
    
    var startAnnotation:MKPointAnnotation = MKPointAnnotation()
    var endAnnotation:MKPointAnnotation = MKPointAnnotation()

    
    func makeCoordinator() -> MapViewCoordinator {
        return MapViewCoordinator()
    }
    
    
    func makeUIView(context: Context) -> MKMapView {
        mapView.delegate = context.coordinator
        mapView.showsUserLocation = true
        mapView.setUserTrackingMode(.follow, animated: true)
        mapView.showsCompass = true
        mapView.region = manager.region
        
        return mapView
    }
    
    
    func updateUIView(_ uiView: MKMapView, context: Context) {
        // Update view here
    }
    
    
    
    class MapViewCoordinator: NSObject, MKMapViewDelegate {
        func mapView(_ mapView: MKMapView, rendererFor overlay: MKOverlay) -> MKOverlayRenderer {
            let renderer = MKPolylineRenderer(overlay: overlay)
            renderer.strokeColor = .systemBlue
            renderer.lineWidth = 5
            return renderer
        }
    }
}
