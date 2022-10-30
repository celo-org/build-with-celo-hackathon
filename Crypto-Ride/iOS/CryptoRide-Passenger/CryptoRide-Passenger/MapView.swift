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
    @EnvironmentObject var ride:RideService
    
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
        //mapView.register(CarAnnotationView.self, forAnnotationViewWithReuseIdentifier: "pin")
        
        
        return mapView
    }
    
    
    func getHumanAddress(coordinates:CLLocationCoordinate2D,isStart:Bool) {
        let address = CLGeocoder.init()
        address.reverseGeocodeLocation(CLLocation.init(latitude: coordinates.latitude, longitude:coordinates.longitude)) { (places, error) in
                if error == nil{
                    if let place = places{
                            if(isStart){

                                ride.humanStartLocation = place.first?.name ?? "Unkown Address"
                            }else{
                                ride.humanEndLocation = place.first?.name ?? "Unkown Address"
                            }
                        
                        //here you can get all the info by combining that you can make address
                    }
                }
            }
    }
    
    func updateUIView(_ uiView: MKMapView, context: Context) {

        if(manager.updateRegion) {
            print("Update region")
        
            mapView.selectAnnotation(manager.selectedAnnotation!, animated: true)
            
            mapView.region = manager.region
            manager.updateRegion = false
        }
        
        if(ride.userLocation) {
            startAnnotation.title = "Start"
            startAnnotation.coordinate = CLLocationCoordinate2D(latitude: manager.currentLocation!.coordinate.latitude, longitude: manager.currentLocation!.coordinate.longitude )
            
            getHumanAddress(coordinates: startAnnotation.coordinate, isStart: true)
            
            
            uiView.addAnnotation(startAnnotation)
            ride.userLocation = false
        }
        
        if(ride.showDropOnStart && ride.startDropLocation != nil) {
  
            let coordinate = self.mapView.convert(ride.startDropLocation!, toCoordinateFrom: self.mapView)
            //ride.startLocation = coordinate
            startAnnotation.title = "Start"
            startAnnotation.coordinate = coordinate
            uiView.addAnnotation(startAnnotation)
            
            getHumanAddress(coordinates: startAnnotation.coordinate, isStart: true)
            
            ride.showDropOnStart = false
            ride.startDropLocation = nil
            
        }
        
        if(ride.showDropOnEnd && ride.endDropLocation != nil){
            
            let coordinate = self.mapView.convert(ride.endDropLocation!, toCoordinateFrom: self.mapView)
            
            //ride.endLocation = coordinate
            endAnnotation.title = "End"
            endAnnotation.coordinate = coordinate
            
            getHumanAddress(coordinates: endAnnotation.coordinate, isStart: false)
            
            uiView.addAnnotation(endAnnotation)
            ride.showDropOnEnd = false
            ride.endDropLocation = nil
        }
        
        if(manager.route != nil ) {
            // Check if need to snap back to route
            if(manager.snapToRoute){
                print("Snap to map")
                uiView.setVisibleMapRect(
                    manager.route!.polyline.boundingMapRect,
                    edgePadding: UIEdgeInsets(top: 50, left: 50, bottom: 50, right: 50),
                    animated: true)
                manager.snapToRoute = false
            }
            return
        }
        
        
        if(!manager.driverPoints.isEmpty){
            //uiView.addAnnotations()
            uiView.addAnnotations(manager.driverPoints)
            //print("Adding driver pins")
                
        }

        
        if(startAnnotation.title == nil || endAnnotation.title  == nil) {return}
        
        let p1 = MKPlacemark(coordinate: startAnnotation.coordinate)
        
        let p2 = MKPlacemark(coordinate: endAnnotation.coordinate)
        
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
            self.ride.startLocation = startAnnotation.coordinate
            self.ride.endLocation = endAnnotation.coordinate
            return
        }
        
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
            print(annotation)
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

