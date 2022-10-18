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
    
    @EnvironmentObject var manager:LocationManager
    @EnvironmentObject var ride:Ride
    
    
    func makeCoordinator() -> MapViewCoordinator {
        return MapViewCoordinator()
    }
    
    
    func makeUIView(context: Context) -> MKMapView {
        let mapView = MKMapView()
        
        mapView.delegate = context.coordinator
        mapView.showsUserLocation = true
        mapView.setUserTrackingMode(.follow, animated: true)
        mapView.region = manager.region
        
        // interactionModes: MapInteractionModes.all,
        //showsUserLocation:true,
        //userTrackingMode:$tracking
        //
        
        //let region = MKCoordinateRegion(
        //  center: CLLocationCoordinate2D(latitude: 40.71, longitude: -74),
        //  span: MKCoordinateSpan(latitudeDelta: 0.5, longitudeDelta: 0.5))
        //mapView.setRegion(region, animated: true)
        
        // NYC
        //let p1 = MKPlacemark(coordinate: CLLocationCoordinate2D(latitude: 40.71, longitude: -74))
        
        // Boston
        //let p2 = MKPlacemark(coordinate: CLLocationCoordinate2D(latitude: 42.36, longitude: -71.05))
        /*
         let request = MKDirections.Request()
         request.source = MKMapItem(placemark: p1)
         request.destination = MKMapItem(placemark: p2)
         request.transportType = .automobile
         
         let directions = MKDirections(request: request)
         directions.calculate { response, error in
         guard let route = response?.routes.first else { return }
         mapView.addAnnotations([p1, p2])
         mapView.addOverlay(route.polyline)
         mapView.setVisibleMapRect(
         route.polyline.boundingMapRect,
         edgePadding: UIEdgeInsets(top: 20, left: 20, bottom: 20, right: 20),
         animated: true)
         }
         */
        return mapView
    }
    
    
    func updateUIView(_ uiView: MKMapView, context: Context) {
        if(manager.route != nil ) {
            return
        }
   
        if(!manager.driverPoints.isEmpty){
            uiView.addAnnotations(manager.driverPoints)
            //for (address, pin) in manager.driverPoints {
            
                //if uiView.annotations.count == 1 {
                //    print("Updating annoation")
                    print("Adding pin")
                
                    
                   
                //}else{
                    //print("Adding annotation once")
                    
                //}
                
            //}
            
      
        }
        
        if(ride.startLocation == nil || ride.endLocation == nil) {return}
       
        let p1 = MKPlacemark(coordinate: ride.startLocation!)
        
        let p2 = MKPlacemark(coordinate: ride.endLocation!)
        
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
            uiView.addAnnotations([p1, p2])
            uiView.addOverlay(route.polyline)
            uiView.setVisibleMapRect(
                route.polyline.boundingMapRect,
                edgePadding: UIEdgeInsets(top: 20, left: 20, bottom: 20, right: 20),
                animated: true)
            
        }
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

