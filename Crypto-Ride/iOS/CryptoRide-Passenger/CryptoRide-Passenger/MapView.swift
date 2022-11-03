//
//  MapView.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 9/14/22.
//

import Foundation
import SwiftUI
import MapKit


struct MapView: UIViewRepresentable {
    typealias UIViewType = MKMapView
    
    let mapView = MKMapView()
    
    @EnvironmentObject var manager:LocationManager
    @EnvironmentObject var rideService:RideService
    
    //var startAnnotation:MKPointAnnotation = MKPointAnnotation()
    //var endAnnotation:MKPointAnnotation = MKPointAnnotation()

    
    func makeCoordinator() -> MapViewCoordinator {
        return MapViewCoordinator()
    }
    
    
    func makeUIView(context: Context) -> MKMapView {
        mapView.delegate = context.coordinator
        mapView.showsUserLocation = true
        mapView.setUserTrackingMode(.follow, animated: true)
        mapView.showsCompass = true
        mapView.region = manager.region
        mapView.addAnnotation(rideService.startAnnotation)
        rideService.startAnnotation.title = "PickUp"
        mapView.addAnnotation(rideService.endAnnotation)
        rideService.endAnnotation.title = "DropOff"
        
        return mapView
    }
    
    
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
    
    func updateUIView(_ uiView: MKMapView, context: Context) {
        
        
        
        
        if(manager.removeAnnotation != nil) {
            uiView.removeAnnotation(manager.removeAnnotation!)
            manager.removeAnnotation = nil
        }
        
        if(manager.updateRegion) {
            if manager.selectedAnnotation == nil {
                manager.updateRegion = false
                return
            }
            mapView.selectAnnotation(manager.selectedAnnotation!, animated: true)
            mapView.region = manager.region
            manager.updateRegion = false
        }
        
        //if(manager.isTracking) {
        //    manager.trackAnnotation
        //}
        
        if(!manager.driverPoints.isEmpty){
            //uiView.addAnnotations()
            uiView.addAnnotations(manager.driverPoints)
            //print("Adding driver pins")
        }
        
 
        
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
    
        
        
        if(rideService.userLocation) {
  
            rideService.startAnnotation.coordinate = CLLocationCoordinate2D(latitude: manager.currentLocation!.coordinate.latitude, longitude: manager.currentLocation!.coordinate.longitude )
            
            rideService.startLocation = rideService.startAnnotation.coordinate
            
            getHumanAddress(coordinates: rideService.startAnnotation.coordinate, isStart: true)
            
            uiView.addAnnotation(rideService.startAnnotation)
            rideService.userLocation = false
        }
        
        if(rideService.showDropOnStart && rideService.startDropLocation != nil) {
            
            let coordinate = self.mapView.convert(rideService.startDropLocation!, toCoordinateFrom: self.mapView)
            rideService.startAnnotation.coordinate = coordinate
            
            rideService.startLocation = coordinate
            
            uiView.addAnnotation(rideService.startAnnotation)
  
            getHumanAddress(coordinates: rideService.startAnnotation.coordinate, isStart: true)
            
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
        
        if(manager.route != nil ) {
            // Check if need to snap back to route
            if(manager.snapToRoute){
                print("Snap to map")
                uiView.setVisibleMapRect(
                    manager.route!.polyline.boundingMapRect,
                    edgePadding: UIEdgeInsets(top: 10, left: 50, bottom: 100, right: 50),
                    animated: true)
                manager.snapToRoute = false
            }
        }

        // Update route for announced rides
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

            if(p1 == nil && p2 == nil){
                return
            }
            if manager.route != nil {
                mapView.removeOverlays(mapView.overlays)
            }

            let request = MKDirections.Request()
            request.source = MKMapItem(placemark: p1!)
            request.destination = MKMapItem(placemark: p2!)
            request.transportType = .automobile
            
            let directions = MKDirections(request: request)
            directions.calculate { response, error in
                print("Found route to location")
                guard let route = response?.routes.first else { return }
                manager.route = route
                manager.getRideEstimates()
                uiView.addOverlay(route.polyline)
                uiView.setVisibleMapRect(
                    route.polyline.boundingMapRect,
                    edgePadding: UIEdgeInsets(top: 20, left: 20, bottom: 60, right: 20),
                    animated: true)
                rideService.updateRoute = false
                return
            }
    
        }
        
        
            /*
            if rideService.startAnnotation.coordinate.latitude == 0.0 ||
                rideService.startAnnotation.coordinate.longitude == 0.0 ||
                rideService.endAnnotation.coordinate.longitude == 0.0 ||
                rideService.endAnnotation.coordinate.latitude == 0.0{return}
            
            if manager.route != nil {
                mapView.removeOverlays(mapView.overlays)
                manager.route = nil
            }
            
            let p1 = MKPlacemark(coordinate: rideService.startAnnotation.coordinate)
            let p2 = MKPlacemark(coordinate: rideService.endAnnotation.coordinate)
            
            let request = MKDirections.Request()
            request.source = MKMapItem(placemark: p1)
            request.destination = MKMapItem(placemark: p2)
            request.transportType = .automobile
            
            
            let directions = MKDirections(request: request)
            directions.calculate { response, error in
                print("Found route to location")
                guard let route = response?.routes.first else { return }
                manager.route = route
                manager.getRideEstimates()
                uiView.addOverlay(route.polyline)
                uiView.setVisibleMapRect(
                    route.polyline.boundingMapRect,
                    edgePadding: UIEdgeInsets(top: 20, left: 20, bottom: 60, right: 20),
                    animated: true)
                rideService.updateRoute = false
            }
        
        
        */

                
/*
 
 
        if(rideService.startLocation == nil || rideService.endLocation == nil) {return}
             

                    let p1 = MKPlacemark(coordinate: rideService.startLocation!)
                    let p2 = MKPlacemark(coordinate: rideService.startLocation!)
                    
                    let request = MKDirections.Request()
                    request.source = MKMapItem(placemark: p1)
                    request.destination = MKMapItem(placemark: p2)
                    request.transportType = .automobile
                    print("Update")
                    
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
                        //rideService.updateRoute = false
                        return
                    }
                */
    }
    
    // Used for testing driver locations
    func addRadiusCircle(location: CLLocation){
        let circle = MKCircle(center: location.coordinate, radius: 10)
        self.mapView.addOverlay(circle)
        
    }
    
    class MapViewCoordinator: NSObject, MKMapViewDelegate {
        func mapView(_ mapView: MKMapView, rendererFor overlay: MKOverlay) -> MKOverlayRenderer {
            let renderer = MKPolylineRenderer(overlay: overlay)
            renderer.strokeColor = .systemBlue
            renderer.lineWidth = 5
            return renderer
        }
        
        func mapView(_ mapView: MKMapView, viewFor annotation: MKAnnotation) -> MKAnnotationView? {
        
            if annotation is MKUserLocation {
                    return nil
                }
            if annotation is CarAnnotation {
                
                let annotationView = MKMarkerAnnotationView(annotation: annotation, reuseIdentifier: "driver")
                //let annotationView = CarAnnotationView(annotation: annotation, reuseIdentifier: "pin")
                annotationView.canShowCallout = true
                annotationView.markerTintColor = .systemBlue
                
                
                //annotationView.image = UIImage(systemName: "car.fill")?.withTintColor(.green, renderingMode: .alwaysOriginal)
                //annotationView.tintColor = .green
                //annotationView.backgroundColor = .blue
                //annotationView.tintColor = .systemBlue
                
                //let size = CGSize(width: 40, height: 40)
                //annotationView.image = UIGraphicsImageRenderer(size:size).image {
                //    _ in annotationView.image!.draw(in:CGRect(origin:.zero, size:size))
                //}
                return annotationView
            }else{
                // Default pin annotation
                return(nil)
            }

        }
    }
}

