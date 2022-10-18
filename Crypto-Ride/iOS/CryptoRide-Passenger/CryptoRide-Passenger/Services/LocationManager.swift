//
//  LocationManager.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 9/14/22.
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
    
    @Published var drivers:[DriverDetails] = []
    @Published var driverPoints:[MKPointAnnotation] = []
    
    var localDrivers:[String:MKPointAnnotation] = [:]

    @Published var selectedDrivers:DriverDetails?
    @Published var normalizedPrice:Double = 0.00
    @Published var route:MKRoute?
    
    private let manager = CLLocationManager()
    
    private var currentLocation:CLLocation?
    private var lastGeocodeTime:Date? = Date()

    private var driverRate = 23.00 // This is also 23 dollars a hour

    private var db:Firestore!
    
    override init() {
        super.init()
        //ContractServices()
        FirebaseApp.configure()
        db = Firestore.firestore()
        
        manager.delegate = self
        manager.desiredAccuracy = kCLLocationAccuracyBest
        manager.requestWhenInUseAuthorization()
        manager.startUpdatingLocation()
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        
        locations.last.map {
            
            let newLocation = CLLocation(latitude: $0.coordinate.latitude, longitude: $0.coordinate.longitude)
            
            let currentTime = Date()
            let lastLocation = self.currentLocation
            self.currentLocation = newLocation
            
            if let lastLocation = lastLocation,
                newLocation.distance(from: lastLocation) <= 1000,
                let lastTime = lastGeocodeTime,
                // Updates driver in local area
                currentTime.timeIntervalSince(lastTime) < 30 {
                    return
                }
                lastGeocodeTime = currentTime
                print("Fetching local drivers")
                geoQuery(userLocation: $0.coordinate)
      
            }
        }
    
    func getRideEstimates() {
        var ratesWithDriver:[DriverDetails] = []
        if(route == nil){return}
        for driver in drivers{
            // TODO take the amount of drivers and avarage the rates to get a normalized price
            var dr = driver
            let priceWithDriverRate = 60 / driverRate
            let driverRateAppliedToRide = route!.expectedTravelTime *  (priceWithDriverRate / 60)
            normalizedPrice = driverRateAppliedToRide
            dr.rateAppliedToRide = driverRateAppliedToRide
            ratesWithDriver.append(dr)
        }
        drivers = ratesWithDriver
    }
    
    func listenForChanges(driver:String) {
        
        let ref = Database.database().reference().child("driver").child(driver)
        //refHandle = postRef.observe(DataEventType.value, with: { snapshot in
        ref.observe(.value, with: {(snapshot) in
            let userDict = snapshot.value as? [String:Any]
            print(userDict) 
            
        })
        
        //ref.observe(of:.value, with: { (snapshot) in
        //     if let userDict = snapshot.value as? [String:Any] {
                  //Do not cast print it directly may be score is Int not string
        //          print("Change to driver data")
        //          print(userDict)
        //     }else{
        //         print("faled")
        //     }
        //})
    }
    
    func geoQuery(userLocation:CLLocationCoordinate2D) {
     
        // Find drivers within 5 miles of passenger
       
        let radiusInM: Double = 50 * 1000

        
        // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
        // a separate query for each pair. There can be up to 9 pairs of bounds
        // depending on overlap, but in most cases there are 4.
        let queryBounds = GFUtils.queryBounds(forLocation: userLocation,
                                              withRadius: radiusInM)
        let queries = queryBounds.map { bound -> Query in
            return db.collection("cities")
                .order(by: "geoHash")
                .start(at: [bound.startValue])
                .end(at: [bound.endValue])
        }
        
        // Collect all the query results together into a single list
        func getDocumentsCompletion(snapshot: QuerySnapshot?, error: Error?) -> () {
            guard let documents = snapshot?.documents else {
                print("Unable to fetch local drivers from firebase. \(String(describing: error))")
                return
            }
            
            for document in documents {
                
                let lat = document.data()["lat"] as? Double ?? 0
                let lng = document.data()["lng"] as? Double ?? 0
                
                let coordinates = CLLocation(latitude: lat, longitude: lng)
                let centerPoint = CLLocation(latitude: userLocation.latitude, longitude: userLocation.longitude)
                
                // We have to filter out a few false positives due to GeoHash accuracy, but
                // most will match
                let distance = GFUtils.distance(from: centerPoint, to: coordinates)
            
                if distance <= radiusInM {
                    let driver = DriverDetails(address: document.data()["driver"] as! String)
                    
                    if localDrivers.contains(where: { $0.key.hasPrefix(driver.address) }){
                        print("driver already listed")
                    }else{
                        let driverPin = MKPointAnnotation()
                            driverPin.title = driver.address
                            driverPin.coordinate = CLLocationCoordinate2D(latitude: lat, longitude: lng)
                            //driverPoints.append(driverPin)
                        
                        localDrivers[driver.address] = driverPin
                        listenForChanges(driver: driver.address)
                    }
                    //let glyphIndex = driverPoints.firstIndex(where: { $0.key.hasPrefix(driver.address) })
                    //if driverPoints.count == 1 {
                        // Update annotation
                    //    print("Updating annotation")
                    //    print("lat \(lat) lng \(lng)")
                    //    driverPoints[0].coordinate = CLLocationCoordinate2D(latitude: lat, longitude: lng)
                        //let driverPin = MKPointAnnotation()
                        //driverPin.title = driver.address
                        //driverPin.coordinate = CLLocationCoordinate2D(latitude: lat, longitude: lng)
                        //driverPoints[driver.address] = driverPin
                        //UIView.animate(withDuration: 1, animations: {
                              // Update annotation coordinate to be the destination coordinate
                        //self.driverPoints[driver.address]!.coordinate = CLLocationCoordinate2D(latitude: lat, longitude: lng)
                        //  }, completion: nil)
                        
                        
                    //} else {
                    //    print("Creating new annotation")
                        // Create new annotation
                    //    let driverPin = MKPointAnnotation()
                    //    driverPin.title = driver.address
                    //    driverPin.coordinate = CLLocationCoordinate2D(latitude: lat, longitude: lng)
                    //    driverPoints.append(driverPin)
                    //}
                    
                    // Get blockchain data from here
                    //drivers.append(driver)
                    
                }
            }
        }

        // After all callbacks have executed, matchingDocs contains the result. Note that this
        // sample does not demonstrate how to wait on all callbacks to complete.
        for query in queries {
            query.getDocuments(completion: getDocumentsCompletion)
        }
    }
    }
