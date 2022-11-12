//
//  MapView.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 9/14/22.
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
        // We are going to add are pickUp and dropOff annoations
        // On init no location is set
        mapView.addAnnotation(rideService.startAnnotation)
        rideService.startAnnotation.title = "PickUp"
        mapView.addAnnotation(rideService.endAnnotation)
        rideService.endAnnotation.title = "DropOff"

        return mapView
    }
    
    // Converts coordinates to human readable address
    func getHumanAddress(coordinates:CLLocationCoordinate2D,isStart:Bool) {
        let address = CLGeocoder.init()
        address.reverseGeocodeLocation(CLLocation.init(latitude: coordinates.latitude, longitude:coordinates.longitude)) { (places, error) in
                if error == nil{
                    if let place = places{
                            if(isStart){

                                rideService.humanStartLocation = place.first?.name ?? "Unkown Address"
                            }else{
                                rideService.humanEndLocation = place.first?.name ?? "Unkown Address"
                            }
                        
                        //here you can get all the info by combining that you can make address
                    }
                }
            }
    }
    
    // MARK: updateUIView
    /// Responsible for changes and updates to the mapView
    /// - NOTE: Do to the way mapView is built for story board booleans are used to trigger changes in the mapView
    func updateUIView(_ uiView: MKMapView, context: Context) {
        // Removal of a annoation
        if(manager.removeAnnotation != nil) {
            uiView.removeAnnotation(manager.removeAnnotation!)
            manager.removeAnnotation = nil
        }
        // Update map reigon
        if(manager.updateRegion) {
            if manager.selectedAnnotation == nil {
                manager.updateRegion = false
                return
            }
            mapView.selectAnnotation(manager.selectedAnnotation!, animated: true)
            mapView.region = manager.region
            manager.updateRegion = false
        }
        
        // Add driver annoations
        if(!manager.driverPoints.isEmpty){
            uiView.addAnnotations(manager.driverPoints)
        }
        
 
        // Removes all Overlays and route annotaions
        if(manager.clean){
            mapView.removeOverlays(mapView.overlays)
            manager.route = nil
            manager.clean = false
            mapView.removeAnnotation(rideService.startAnnotation)
            rideService.startLocation = nil
            rideService.endLocation = nil
            rideService.startAnnotation.title = nil
            rideService.endAnnotation.title = nil
            mapView.removeAnnotation(rideService.endAnnotation)
            
            return
        }
    
        
        // Setting of route start annotation as current location
        if(rideService.userLocation) {
  
            rideService.startAnnotation.coordinate = CLLocationCoordinate2D(latitude: manager.currentLocation!.coordinate.latitude, longitude: manager.currentLocation!.coordinate.longitude )
            
            rideService.startLocation = rideService.startAnnotation.coordinate
            
            getHumanAddress(coordinates: rideService.startAnnotation.coordinate, isStart: true)
            
            uiView.addAnnotation(rideService.startAnnotation)
            rideService.userLocation = false
        }
        
        // Setting of route start annotation as drop location
        if(rideService.showDropOnStart && rideService.startDropLocation != nil) {
            // Covert screen drop location to coordinate on map
            let coordinate = self.mapView.convert(rideService.startDropLocation!, toCoordinateFrom: self.mapView)
            // Set start annotation coordinates to pin drop coordinates
            rideService.startAnnotation.coordinate = coordinate
            // Set start location
            rideService.startLocation = coordinate
            // add start annotation to mapView
            uiView.addAnnotation(rideService.startAnnotation)
            // Convert pin drop coordinates to human readabl
            getHumanAddress(coordinates: rideService.startAnnotation.coordinate, isStart: true)
            // Set drop location back to default
            rideService.showDropOnStart = false
            rideService.startDropLocation = nil
            
        }
        
        if(rideService.showDropOnEnd && rideService.endDropLocation != nil){
            
            let coordinate = self.mapView.convert(rideService.endDropLocation!, toCoordinateFrom: self.mapView)
            rideService.endLocation = coordinate
            rideService.endAnnotation.coordinate = coordinate
   
            getHumanAddress(coordinates: rideService.endAnnotation.coordinate, isStart: false)
            uiView.addAnnotation(rideService.endAnnotation)
            rideService.showDropOnEnd = false
            rideService.endDropLocation = nil
        }
        
        // Snaps to the bounding map of a MKRoute
        if(manager.route != nil ) {
            // Check if need to snap back to route
            if(manager.snapToRoute){
                uiView.setVisibleMapRect(
                    manager.route!.polyline.boundingMapRect,
                    edgePadding: UIEdgeInsets(top: 60, left: 40, bottom: 300, right:40),
                    animated: true)
                manager.snapToRoute = false
            }
        }

        // Calculates MKRoute between the two pin drop coordinates
        // Adds MKRoute polyline to the mapview
        if rideService.updateRoute {
            var p1:MKPlacemark?
            var p2:MKPlacemark?
            if(rideService.ride.startCoordinates != nil || rideService.ride.endCoordinates  != nil) {
                p1 = MKPlacemark(coordinate: rideService.ride.startCoordinates!)
                p2 = MKPlacemark(coordinate: rideService.ride.endCoordinates!)
            }
            if(rideService.startLocation != nil && rideService.endLocation != nil){
                p1 = MKPlacemark(coordinate: rideService.startLocation!)
                p2 = MKPlacemark(coordinate: rideService.endLocation!)
            }
            // Check if are points are nil
            if(p1 == nil && p2 == nil){
                return
            }
            // Check if route exist
            if manager.route != nil {
                // remove existing route from map
                mapView.removeOverlays(mapView.overlays)
            }
            // Build route request
            let request = MKDirections.Request()
            request.source = MKMapItem(placemark: p1!)
            request.destination = MKMapItem(placemark: p2!)
            request.transportType = .automobile
            
            let directions = MKDirections(request: request)
            directions.calculate { response, error in
                
                guard let route = response?.routes.first else { return }
                manager.route = route
                // Get ride estimates
                manager.getRideEstimates()
                // Add mkroute polyline to mapView
                uiView.addOverlay(route.polyline)
                uiView.setVisibleMapRect(
                    route.polyline.boundingMapRect,
                    edgePadding: UIEdgeInsets(top: 60, left: 40, bottom: 150, right:40),
                    animated: true)
                rideService.updateRoute = false
                return
            }
    
        }
        
    }
    
    // Used for testing driver locations
    // Currently not used
    func addRadiusCircle(location: CLLocation){
        let circle = MKCircle(center: location.coordinate, radius: 10)
        self.mapView.addOverlay(circle)
    }
    
    // MARK: MapViewCoordinator
    class MapViewCoordinator: NSObject, MKMapViewDelegate {
        func mapView(_ mapView: MKMapView, rendererFor overlay: MKOverlay) -> MKOverlayRenderer {
            let renderer = MKPolylineRenderer(overlay: overlay)
            renderer.strokeColor = .systemBlue
            renderer.lineWidth = 5
            return renderer
        }
        
        func mapView(_ mapView: MKMapView, viewFor annotation: MKAnnotation) -> MKAnnotationView? {
            // Check Annoation type
            if annotation is MKUserLocation {
                    return nil
                }

            if annotation is CarAnnotation {
                // Use custom annotations for driver pins
                let reuseId = "car"

                var anView = mapView.dequeueReusableAnnotationView(withIdentifier: reuseId)
                if anView == nil {
                    anView = MKAnnotationView(annotation: annotation, reuseIdentifier: reuseId)
                    anView!.canShowCallout = true
                }
                else {
                    anView!.annotation = annotation
                }
  
                anView!.image =  UIImage(systemName: "car.fill")
                
                return anView
     
            }else{
                // Default pin annotation
                return(nil)
            }

        }
    }
}

