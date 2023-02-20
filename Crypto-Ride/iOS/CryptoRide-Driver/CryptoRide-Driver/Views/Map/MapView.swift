//
//  MapView.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/21/22.
//

import Foundation
import SwiftUI
import MapKit

// MARK: MapView
/// MapView is primarily build for storyboard.
/// SwiftUI conversion from a storyboard view
struct MapView: UIViewRepresentable {
    typealias UIViewType = MKMapView
    
    // MKMapView
    let mapView = MKMapView()
    
    // EnvironmentObjects
    @EnvironmentObject var manager:LocationManager
    @EnvironmentObject var rideService:RideService
    @EnvironmentObject var driver:Driver

    // Coordinator for mapView
    func makeCoordinator() -> MapViewCoordinator {
        return MapViewCoordinator()
    }
    
    // Set Delegate and settings for mapview
    func makeUIView(context: Context) -> MKMapView {
        mapView.delegate = context.coordinator
        mapView.showsUserLocation = true
        mapView.setUserTrackingMode(.follow, animated: true)
        mapView.showsCompass = true
        mapView.region = manager.region
        // Set start and end annotation titles
        rideService.startAnnotation.title = "PickUp"
        rideService.endAnnotation.title = "DropOff"
        
        return mapView
    }
    
    
    // MARK: updateUIView
    /// Responsible for changes and updates to the mapView
    /// - NOTE: Do to the way mapView is built for story board booleans are used to trigger changes in the mapView
    func updateUIView(_ uiView: MKMapView, context: Context) {
        
        // Remove overlays and start end annoations from mapView
        if rideService.removeAll {
            uiView.removeOverlays(uiView.overlays)
            mapView.removeAnnotation(rideService.startAnnotation)
            mapView.removeAnnotation(rideService.endAnnotation)
            rideService.removeAll = false
        }
        
        // Snap to MKRoute
        if(manager.route != nil ) {
            // Check if need to snap back to route
            if(rideService.snapToRoute){
                uiView.setVisibleMapRect(
                    manager.route!.polyline.boundingMapRect,
                    edgePadding: UIEdgeInsets(top: 60, left: 40, bottom: 300, right:40),
                    animated: true)
                rideService.snapToRoute = false
            }
        }
        
        // Remove only MKroute from mapView
        if rideService.removeRoute {
            uiView.removeOverlay(manager.route!.polyline)
            rideService.removeRoute = false
        }
        
        // Remove pickUp Route from MapView
        // Pickup route is between driver and pickup location
        if rideService.removePickUpRoute && manager.pickUpRoute != nil{
            uiView.removeOverlay(manager.pickUpRoute!.polyline)
            rideService.removePickUpRoute = false
        }
        
        // Calculates MKRoute between the drivers current location and start location
        // Adds MKRoute polyline to the mapview
        if rideService.showPickUpRoute && rideService.ride.rideState == 2 {
            
            if(rideService.ride.startCoordinates != nil || rideService.ride.endCoordinates  != nil) {
                // Setup placemarks
                let p1 = MKPlacemark(coordinate: uiView.userLocation.coordinate)
                let p2 = MKPlacemark(coordinate: rideService.ride.startCoordinates!)
                // Add annotation to mapView
                mapView.addAnnotation(rideService.startAnnotation)
                mapView.addAnnotation(rideService.endAnnotation)
                // Build route request
                let request = MKDirections.Request()
                request.source = MKMapItem(placemark: p1)
                request.destination = MKMapItem(placemark: p2)
                request.transportType = .automobile
                
                let directions = MKDirections(request: request)
                directions.calculate { response, error in
                    
                    guard let route = response?.routes.first else { return }
                    manager.pickUpRoute = route
                    // Get ride estimates
                    manager.getRideEstimates(rate: driver.fare)
                    route.polyline.title = "Pick Up Route"
                    // Add route overlay to mapview
                    uiView.addOverlay(route.polyline)
                    uiView.setVisibleMapRect(
                        route.polyline.boundingMapRect,
                        edgePadding: UIEdgeInsets(top: 20, left: 20, bottom: 60, right: 20),
                        animated: true)
                    rideService.showPickUpRoute = false
                }
                return
            }
        }
        
        // Calculates MKRoute between the start and end coordinate location
        // Adds MKRoute polyline to the mapview
        if rideService.updateRoute {
            
            if(rideService.ride.startCoordinates != nil || rideService.ride.endCoordinates  != nil) {
                rideService.startAnnotation.coordinate = rideService.ride.startCoordinates!
                rideService.endAnnotation.coordinate = rideService.ride.endCoordinates!
                let p1 = MKPlacemark(coordinate: rideService.ride.startCoordinates!)
                let p2 = MKPlacemark(coordinate: rideService.ride.endCoordinates!)
                
                mapView.addAnnotation(rideService.startAnnotation)
                mapView.addAnnotation(rideService.endAnnotation)
                
                let request = MKDirections.Request()
                request.source = MKMapItem(placemark: p1)
                request.destination = MKMapItem(placemark: p2)
                request.transportType = .automobile
                
                
                let directions = MKDirections(request: request)
                directions.calculate { response, error in
                    guard let route = response?.routes.first else { return }
                    manager.route = route
                   
                    manager.getRideEstimates(rate: driver.fare)
                    uiView.addOverlay(route.polyline)
                    uiView.setVisibleMapRect(
                        route.polyline.boundingMapRect,
                        edgePadding: UIEdgeInsets(top: 20, left: 20, bottom: 60, right: 20),
                        animated: true)
                    rideService.updateRoute = false
                    return
                }
            }
    
        }

        
    }
    
    
    // MARK: MapViewCoordinator
    class MapViewCoordinator: NSObject, MKMapViewDelegate {
        
        
        func mapView(_ mapView: MKMapView, rendererFor overlay: MKOverlay) -> MKOverlayRenderer {
            if overlay is MKCircle {
                let circle = MKCircleRenderer(overlay: overlay)
                circle.strokeColor = UIColor.red
                circle.fillColor = UIColor(red: 255, green: 0, blue: 0, alpha: 0.1)
                circle.lineWidth = 1
                return circle
            } else {
                let renderer = MKPolylineRenderer(overlay: overlay)
                // Switch between polyline color
                if renderer.polyline.title ==  "Pick Up Route" {
                    renderer.strokeColor = .systemGreen
                    renderer.lineWidth = 5
                }else{
                    renderer.strokeColor = .systemBlue
                    renderer.lineWidth = 5
                }
                return renderer
            }

        }
    }
}
