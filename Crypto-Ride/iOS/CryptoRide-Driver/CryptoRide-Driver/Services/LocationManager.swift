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

// MARK: LocationManager
/// Start driver init location
/// Keeps updated location in firebase
///
///
class LocationManager: NSObject,CLLocationManagerDelegate,ObservableObject {
    
    @Published var region = MKCoordinateRegion()
    
    // Routes displayed on `mapView`
    @Published var route:MKRoute?
    @Published var pickUpRoute:MKRoute?
    // Price of route
    @Published var driverRidePrice:Double?

    // Location broadcast
    @Published var isActive = false
    
    // Loading and error
    @Published var isLoading = false
    @Published var error:Error? = nil
    
    // Temp route allows drivers to accept a ride
    var tempRoute:MKRoute?
    
    // FireStore
    private var db:Firestore!

    // CLLocationManagerDelegate variables
    private var currentLocation:CLLocation?
    private var lastGeocodeTime:Date? = Date()
    private let manager = CLLocationManager()
    
    // FireStore init drivers location
    private var wasInit = false
    
    // Driver wallet
    private var wallet:Wallet?
    private var activeCity = ""
    
    struct Location:Codable{
        let long,lat:Double
    }
    
    
    override init() {
        super.init()
        // Set the fireStore
        db = Firestore.firestore()
        // Set driver wallet obj
        wallet = ContractServices.shared.getWallet()
        // CLLocationManagerDelegate
        manager.delegate = self
        manager.desiredAccuracy = kCLLocationAccuracyBest
        manager.requestWhenInUseAuthorization()
        manager.startUpdatingLocation()
    }
    
    // MARK: getRideEstimates
    /// Allows drivers fare price to used to estimate the price
    func getRideEstimates(rate:Int) {
        if rate == 0{return}
        if route == nil {return}
        let priceWithDriverRate = Double(60 / rate)
        driverRidePrice = route!.expectedTravelTime * (priceWithDriverRate / 60)
    }
    
    // MARK: locationManager
    /// Updates user location on the mapView
    /// Calls geoQuery to find local driver with current location
    ///
    /// - Parameters:
    ///     - `manager` CLLocation Manager for delegate call
    ///     - `locations` Updates on user locations
    ///
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        // Check if we are active to broadcast location
        if isActive {
            locations.last.map {
                
                let newLocation = CLLocation(latitude: $0.coordinate.latitude, longitude: $0.coordinate.longitude)
                
                let currentTime = Date()
                // get last location
                let lastLocation = self.currentLocation
                // set new location with current
                self.currentLocation = newLocation
                
                // Check if we have moved over 1000 meters
                // Check if time sence last location has exceeded 30 seconds
                if let lastLocation = lastLocation,
                    newLocation.distance(from: lastLocation) <= 1000,
                    let lastTime = lastGeocodeTime,
                    // Updates driver in local area
                    currentTime.timeIntervalSince(lastTime) < 3 { // update every 3 seconds
                        return
                    }
                    lastGeocodeTime = currentTime

                    // Only update firestore once when started
                    if(!wasInit) {
                        // Reverse geo locat users coorinates
                        let address = CLGeocoder.init()
                        let coords = $0.coordinate
                        address.reverseGeocodeLocation(CLLocation.init(latitude: $0.coordinate.latitude, longitude:$0.coordinate.longitude)) { [unowned self] (places, error) in
                            if error == nil{
                                if let place = places{
                                    // Get current city
                                    activeCity =  place.first?.locality ?? ""
                                    // Update firestore with driver location and wallet
                                    startDB(coordinates: coords, city: activeCity, wallet: wallet!)
                                }
                            }
                        }
                    }
                    // Update the readtime db with new location
                    // Look at readme for more info
                    updateDB(location: $0.coordinate, wallet: wallet!)
            }
        }else if !isActive && wasInit{
            deleteDB()
        }
    }
    
    // MARK: updateDB
    /// Updates the drivers realtime database entry
    /// - Note: Passenger app will be notified of changes
    /// - Parameters:
    ///                  - `location`: CLLocationCoordinate2D new coordinates to update entry
    ///                  -  `wallet`: Wallet address of driver to update
    func updateDB(location:CLLocationCoordinate2D, wallet:Wallet) {
            // Build database path
            let databasePath: DatabaseReference? = {
              let ref = Database.database()
                .reference()
                .child("driver/\(wallet.address)") // Using the driver address as path
              return ref
            }()
        
            let encoder = JSONEncoder()
            guard let databasePath = databasePath else {
                return
            }
            // Set location and encode
            let location = Location(long: location.longitude, lat: location.latitude)
            do {
                let data = try encoder.encode(location)

            
              let json = try JSONSerialization.jsonObject(with: data)
              // Set value to database
              databasePath.setValue(json)
    
            } catch {
                self.error = error
            }
            
    }
    
    // MARK: startDB
    /// Sets driver details entry in the Firestore database
    /// Only called once when driver starts broad casting location
    ///
    /// - Note: This entry allow passenger to find driver in the same location
    /// - Parameters:
    ///                  - `coordinates`: CLLocationCoordinate2D new coordinates to update entry
    ///                  -  `city`: City name of drivers work area
    ///                  -  `wallet`: Wallet address of driver to update
    func startDB(coordinates:CLLocationCoordinate2D,city:String, wallet:Wallet) {
        
        wasInit = true
        // More info on GeoHash
        // https://firebase.google.com/docs/firestore/solutions/geoqueries#solution_geohashes
        let hash = GFUtils.geoHash(forLocation: coordinates)
        
        let defaults = UserDefaults.standard
        let twitter = defaults.string(forKey: "twitter") ?? ""
        let instagram = defaults.string(forKey: "instagram") ?? ""
        
        // Check if driver has a document
        db.collection("cities").document(city).collection("Drivers").document(wallet.address).getDocument()
        { [self]
            result,error  in
          
            if result!.exists {
                // Update driver entry with new location
                db.collection("cities").document(city).collection("Drivers").document(wallet.address).updateData([
                    "geoHash":hash,
                    "lat": currentLocation!.coordinate.latitude,
                    "lng": currentLocation!.coordinate.longitude,
                    "twitter":twitter,
                    "facebook":instagram,
                    "time": lastGeocodeTime!,
                    "driver":wallet.address
                ]) { err in
                    if let err = err {
                        print(err)
                        self.error = err
                    }
                }
            }
            else{
                // Add new driver entry to firebase
                db.collection("cities").document(city).collection("Drivers").document(wallet.address).setData([
                    "geoHash":hash,
                    "lat": currentLocation!.coordinate.latitude,
                    "lng": currentLocation!.coordinate.longitude,
                    "twitter":twitter,
                    "facebook":instagram,
                    "time": lastGeocodeTime!,
                    "driver":wallet.address
                ])
                { err in
                   if let err = err {
                       print(err)
                       self.error = err
                   }
               }
            }
        }
    }
    
    // MARK: deleteDB
    /// Remove entry from firebase when driver has stop broadcasting location
    func deleteDB() {
        // Remove realtime DB object
        let ref = Database.database()
          .reference()
        ref.child("driver").child(wallet!.address).removeValue(){
          (error:Error?, ref:DatabaseReference) in
          if let error = error {
              self.error = error
          }
        }
       // Remove firebase object
        db.collection("cities").document(activeCity).collection("Drivers").document(wallet!.address).delete() { err in
            if let err = err {
                self.error = err
            } else {
               // succssfully remove firebase enty
                self.wasInit = false
            }
        }
    }
   
}

