//
//  LocationManager.swift
//  CryptoRide-Driver
//
//  Created by mitchell tucker on 10/21/22.
//

import UIKit
import MapKit
import CoreLocation

import GeoFire
import FirebaseCore
import FirebaseFirestore
import FirebaseDatabase

class LocationManager: NSObject,CLLocationManagerDelegate,ObservableObject {
    
    @Published var region = MKCoordinateRegion()
    @Published var isActive = false
    
    private var db:Firestore!
    private let manager = CLLocationManager()
    
    private var currentLocation:CLLocation?
    private var lastGeocodeTime:Date? = Date()
    
    private var wasInit = false
    
    private var wallet:Wallet?
    
    struct Location:Codable{
        let long,lat:Double
    }
    
    
    override init() {
        super.init()
        
        db = Firestore.firestore()
        
        manager.delegate = self
        manager.desiredAccuracy = kCLLocationAccuracyBest
        manager.requestWhenInUseAuthorization()
        manager.startUpdatingLocation()
        
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        //do {
        wallet = ContractServices.shared.getWallet()
        //}catch {
            
        //}
        //if ContractServices.shared == nil {return}
        //print(ContractServices.shared.getWallet())

        
        if isActive {
            locations.last.map {
                
                let newLocation = CLLocation(latitude: $0.coordinate.latitude, longitude: $0.coordinate.longitude)
                
                let currentTime = Date()
                let lastLocation = self.currentLocation
                self.currentLocation = newLocation
                
                if let lastLocation = lastLocation,
                    newLocation.distance(from: lastLocation) <= 1000,
                    let lastTime = lastGeocodeTime,
                    // Updates driver in local area
                    currentTime.timeIntervalSince(lastTime) < 3 {
                        return
                    }
                    lastGeocodeTime = currentTime
                    // Update location in DB
                    if(!wasInit) {
                        print("Updating firebase")
                        startDB(location: $0.coordinate, wallet:wallet!)
                    }
                
                    updateDB(location: $0.coordinate, wallet: wallet!)
                }
        }else{
            //print("Not broadcasting location")
        }
    }
    
    // Updates realtime db
    func updateDB(location:CLLocationCoordinate2D, wallet:Wallet) {
 
            // Keep adding data to the
            let databasePath: DatabaseReference? = {
              let ref = Database.database()
                .reference()
                .child("driver/\(wallet.address)")
              return ref
            }()
            let encoder = JSONEncoder()
            
            guard let databasePath = databasePath else {
                print("Failed")
                return
            }
            
            let location = Location(long: location.longitude, lat: location.latitude)
            do {
                let data = try encoder.encode(location)

            
              let json = try JSONSerialization.jsonObject(with: data)

              databasePath.setValue(json)
            print("Updating realtime db")
            } catch {
              print("an error occurred", error)
            }
            
    }
    
    /// MARK : startDB
    ///   init driver location and address within firebase
    ///
    func startDB(location:CLLocationCoordinate2D, wallet:Wallet) {
        wasInit = true
        let hash = GFUtils.geoHash(forLocation: location)
        
        
        // Check if driver has a document
        db.collection("cities").document("SF").collection("Drivers").document(wallet.address).getDocument()
        { [self]
            result,error  in
    
            if !result!.exists {
                // Add driver document to firebase
                db.collection("cities").document("SF").collection("Drivers").addDocument(data:[
                    "geoHash":hash,
                    "lat": currentLocation!.coordinate.latitude,
                    "lng": currentLocation!.coordinate.longitude,
                    "time": lastGeocodeTime!,
                    "driver":wallet.address
                ])
                { err in
                   if let err = err {
                       print("Error writing document: \(err)")
                   } else {
                       print("Document successfully written!")
                   }
               }
            }else{
                // Update driver init location
                db.collection("cities").document("SF").collection("Drivers").document(wallet.address).updateData([
                    "geoHash":hash,
                    "lat": currentLocation!.coordinate.latitude,
                    "lng": currentLocation!.coordinate.longitude,
                    "time": lastGeocodeTime!,
                    "driver":wallet.address
                ]) { err in
                    if let err = err {
                        print("Error writing document: \(err)")
                    } else {
                        print("Document successfully written!")
                    }
                }
            }
        }
       
        

     

    }
}

