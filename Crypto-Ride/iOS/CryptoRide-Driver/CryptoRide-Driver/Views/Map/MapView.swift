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
    @EnvironmentObject var rideService:RideService
    //@EnvironmentObject var webSocket:WebSockets

    
    func makeCoordinator() -> MapViewCoordinator {
        return MapViewCoordinator()
    }
    
    
    func makeUIView(context: Context) -> MKMapView {
        mapView.delegate = context.coordinator
        mapView.showsUserLocation = true
        mapView.setUserTrackingMode(.follow, animated: true)
        mapView.showsCompass = true
        mapView.region = manager.region
        
        rideService.startAnnotation.title = "PickUp"
        mapView.addAnnotation(rideService.endAnnotation)
        rideService.endAnnotation.title = "DropOff"
        
        return mapView
    }
    
    
    
    func updateUIView(_ uiView: MKMapView, context: Context) {
        // Update view here

        
        if rideService.removeAll {
            uiView.removeOverlays(uiView.overlays)
            mapView.removeAnnotation(rideService.startAnnotation)
            mapView.removeAnnotation(rideService.endAnnotation)
            rideService.removeAll = false
        }
        
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
        
        if rideService.removeRoute {
            uiView.removeOverlay(manager.route!.polyline)
            rideService.removeRoute = false
        }
        
        if rideService.removePickUpRoute {
            uiView.removeOverlay(manager.pickUpRoute!.polyline)
            rideService.removePickUpRoute = false
        }

        if rideService.showPickUpRoute && rideService.ride.rideState == 2 {
            
            if(rideService.ride.startCoordinates != nil || rideService.ride.endCoordinates  != nil) {
                let p1 = MKPlacemark(coordinate: uiView.userLocation.coordinate)
                let p2 = MKPlacemark(coordinate: rideService.ride.startCoordinates!)
                mapView.addAnnotation(rideService.startAnnotation)
                mapView.addAnnotation(rideService.endAnnotation)
                
                let request = MKDirections.Request()
                request.source = MKMapItem(placemark: p1)
                request.destination = MKMapItem(placemark: p2)
                request.transportType = .automobile
                
                let directions = MKDirections(request: request)
                directions.calculate { response, error in
                    
                    print("Found route to location")
                    guard let route = response?.routes.first else { return }
                    manager.pickUpRoute = route
                    //manager.getRideEstimates()
                    route.polyline.title = "PickUp Route"
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
        
        // Update route for announced rides
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
                    print("Found route to location")
                    guard let route = response?.routes.first else { return }
                    manager.route = route
                    //manager.getRideEstimates()
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
                print(renderer.polyline.title)
                if renderer.polyline.title ==  "PickUp Route" {
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
