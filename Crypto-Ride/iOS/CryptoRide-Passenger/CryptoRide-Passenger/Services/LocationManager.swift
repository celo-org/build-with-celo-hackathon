//
//  LocationManager.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 9/14/22.
//

import UIKit
import SwiftUI
import MapKit
import CoreLocation
import web3swift
import BigInt

import GeoFire
import FirebaseCore
import FirebaseFirestore
import FirebaseDatabase


// MARK: LocationManager
/// Tracking driver positions on mapView
/// Tracking of user location
/// Geobased query to get active drivers in local area
/// Driver ride estimates
/// 
/// - TODO
///     - Improve management of driver locations
///
class LocationManager: NSObject,CLLocationManagerDelegate,ObservableObject {
    
    @Published var error:Error? = nil
    
    // Region variables
    @Published var region = MKCoordinateRegion()
    @Published var updateRegion = false
    
    // MapView variables
    @Published var snapToRoute = false
    @Published var clean = false
    
    // Drivers and rejected drivers
    @Published var rejectedDrivers:[DriverDetails] = []
    @Published var drivers:[DriverDetails] = []
    
    // Map driver address array index
    private var driverMap:[String:Int] = [:]
    
    // List of driver annotations
    @Published var driverPoints:[CarAnnotation] = []
    
    // MapView will remove annotations set
    @Published var removeAnnotation:MKAnnotation? = nil

    // Selecting Annotations on mapView
    @Published var selectedDriver:DriverDetails?
    @Published var selectedAnnotation:CarAnnotation?
    
    // Route Pricing
    @Published var normalizedPrice:Double = 0.00
    @Published var recommendedPrice:Double = 0.00
    
    // Route of ride
    @Published var route:MKRoute?
    
    // CLLocationManagerDelegate variables
    @Published var currentLocation:CLLocation?
    private var lastGeocodeTime:Date? = Date()
    private let manager = CLLocationManager()
    
    // FireStore db
    private var db:Firestore!
    
    // Max distance away from drivers
    private let radiusInM: Double = 1609.34
    private var removedDrivers:[String] = []
    
    override init() {
        super.init()
        // Init are firestore
        db = Firestore.firestore()
        // Setup CLLocationManagerDelegate
        manager.delegate = self
        manager.desiredAccuracy = kCLLocationAccuracyBest
        manager.requestWhenInUseAuthorization()
        manager.startUpdatingLocation()
    }
    
    
    // MARK: changeRegion
    /// Snaps map to a driver annotation
    ///
    public func changeRegion(driver:String) {
        let driverIndex = driverMap[driver]
        selectedAnnotation = driverPoints[driverIndex!]
        region = MKCoordinateRegion(center: driverPoints[driverIndex!].coordinate , span: MKCoordinateSpan(latitudeDelta: 0.02, longitudeDelta: 0.02))
        updateRegion = true
    }
    
    public func cleanMapView() {
        clean = true
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
        // Get last location in map
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
                currentTime.timeIntervalSince(lastTime) < 30 {
                    return
                }
                lastGeocodeTime = currentTime
            // Reverse geo locat users coorinates
            let address = CLGeocoder.init()
            let coords = $0.coordinate
            address.reverseGeocodeLocation(CLLocation.init(latitude: $0.coordinate.latitude, longitude:$0.coordinate.longitude)) {
                [unowned self] (places, error) in
                if let place = places{
                    // Get current city
                    let city =  place.first?.locality ?? ""
                    // Make request for drivers with are location
                    geoQuery(userLocation: coords,city: city)
 
                }
             
            }
          
      
            }
        }
    
    // MARK: getRideEstimates
    /// Uses driver rate and route to estimate ride cost
    /// Sets the normalized ride price avarging driver rates
    ///
    func getRideEstimates() {
        
        if(route == nil){return}
    
        var total = 0.0
        for index in drivers.indices {
            // Check if driver rates are nil
            if (drivers[index].info == nil) {break}
            if (drivers[index].info!.rate == nil) {break}
            let rate = Double(drivers[index].info!.rate!)
            // Average drivers fares with route length and time
            if rate != 0.0{
                let priceWithDriverRate = 60 / rate // convert rate into minutes
                // Apply minutes to time expected
                let driverRateAppliedToRide = route!.expectedTravelTime *  (priceWithDriverRate / 60)
                
                total += driverRateAppliedToRide
                // Set driver ride price
                drivers[index].rateAppliedToRide = driverRateAppliedToRide
            }
        }
        // Avarage ride price with total and amount of drivers
        normalizedPrice = total / Double(drivers.count)
        recommendedPrice = total / Double(drivers.count)
    }
    
    
    // MARK: getDriverDetails
    /// Gets drivers details from ride manager contract
    /// - Parameters
    ///     - `details`: DriverDetails object
    ///     - `index` : index to add driver info object
    func getDriverDetails(details:DriverDetails,index:Int){
        let params = [details.address] as [AnyObject]
        ContractServices.shared.read(contractId: .RideManager, method: RideManagerMethods.getDriverRate.rawValue, parameters: params)
        { result in
            DispatchQueue.main.async { [unowned self] in
                switch(result){
                case .success(let result):
                    let rawRate = result["0"] as! [AnyObject]
                    
                    let isDriver = rawRate[0] as! NSNumber
                    let rate = rawRate[1] as! BigUInt
                    
                    let carAssetUrl = rawRate[2] as! String
                    let infoAssetUrl = rawRate[3] as! String
                    
                    let driverInfo = DriverInfo(
                        address: details.address,
                        isDriver: Bool(exactly: isDriver)!,
                        rate: rate,
                        carAssetLink: carAssetUrl,
                        infoAssetLink: infoAssetUrl,
                        twitterHandle: details.info!.twitterHandle,
                        facebookHandle: details.info!.facebookHandle)
                    // Add driver info to array at driver index
                    self.drivers[index].info = driverInfo
                    // Calculate ride estimates with driver rates
                    getRideEstimates()
                   
                case .failure(let error):
                    self.error = error
                }
            }
        }
    }
    
    
    // MARK: getDriverRating
    /// Gets driver reputation from ride manager contract
    /// - Parameters
    ///     - `details`: DriverDetails object
    ///     - `index` : index to add driver info object
    func getDriverRating(details:DriverDetails,index:Int){
        let params = [details.address] as [AnyObject]
        ContractServices.shared.read(contractId: .RideManager, method: RideManagerMethods.getReputation.rawValue, parameters: params)
        { result in
            DispatchQueue.main.async { [unowned self] in
            
                switch(result){
                case .success(let result):
                    let rawStats = result["0"] as! [AnyObject]
                    let bigRating = rawStats[0] as! BigUInt
                    let rating  = Int(bigRating)
                    let reputation = rawStats[1] as! BigUInt
                    let totalRatings = rawStats[2] as! BigUInt
                    let rideCount = rawStats[3] as! BigUInt
                    
                    let driverStats = Stats(rating: rating,
                                      reputation: reputation,
                                      totalRating: totalRatings,
                                      count: rideCount)
                   
                    self.drivers[index].stats = driverStats
                   
                case .failure(let error):
                    self.error = error
                }
            }
        }
    }
    
    
  
    // MARK: listenForChanges
    /// Get changes from driver location from Realtime db.
    /// Updates driver locations and pin annotations
    /// Remove drivers that  pass passenger distance
    ///
    private var refHandle:UInt?
    func listenForChanges(driver:String) {
        
        let ref = Database.database().reference().child("driver")
        // Observe change to the coodinates by the driver wallet address
        refHandle = ref.child(driver).observe(.value, with: { [ self](snapshot) in
            
            let driverAddress = snapshot.key as String
            
            let driverLocation = snapshot.value as? [String:Any]
            if driverLocation == nil {return}
            
            let lat = driverLocation!["lat"] as! Double
            let long = driverLocation!["long"] as! Double
         
            let index = self.driverMap[driverAddress]
            if(index == nil){return}
            // need to make two coordinate object
            let newLocation = CLLocationCoordinate2D(latitude: lat, longitude: long)
            let driverCL = CLLocation(latitude:lat, longitude: long) // CLLocation used to measure distance
            // get distance between passenger location and driver CLLocation
            let distanceAway = currentLocation!.distance(from: driverCL)

            self.driverPoints[index!].coordinate = newLocation

            if self.driverPoints[index!] == selectedAnnotation{
                changeRegion(driver: driverAddress)
            }
            
        })
        
        ref.observe(.childRemoved, with: {[self] (snapshot) in
            // get driver address to remove
            let driverAddress = snapshot.key as String
            
            for annotation in driverPoints {
                if annotation.title == driverAddress {
                    // Remove driver annotation
                    removeAnnotation = annotation
                    let index = driverMap[driverAddress]
                    if index == nil {return}
                    
                    // Remove arrays with driver details
                    driverPoints.remove(at: index!)
                    driverMap[driverAddress] = nil
                    drivers.remove(at:index!)
                    ref.removeObserver(withHandle: refHandle!)
                }
            }
            

        })
        
        
    }
    
    // MARK: geoQuery
    /// Queries local driver info based on users geo location
    ///
    /// - Note: Read data from FireBase.
    ///
    /// - Parameters:
    ///              - `userLocation`: CLLocationCoordinate2D of passenger.
    ///              - `city`: string city name of passengers current location
    ///
    func geoQuery(userLocation:CLLocationCoordinate2D,city:String) {
    
        // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
        // a separate query for each pair. There can be up to 9 pairs of bounds
        // depending on overlap, but in most cases there are 4.
        let queryBounds = GFUtils.queryBounds(forLocation: userLocation,
                                              withRadius: radiusInM)
      
        let queries = queryBounds.map { bound -> Query in
            return db.collection("cities").document(city).collection("Drivers")
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
                
                let facebook = document.data()["facebook"] as? String ?? ""
                let twitter = document.data()["twitter"] as? String ?? ""
        
                let coordinates = CLLocation(latitude: lat, longitude: lng)
                let centerPoint = CLLocation(latitude: userLocation.latitude, longitude: userLocation.longitude)
                
                // We have to filter out a few false positives due to GeoHash accuracy, but
                // most will match
                let distance = GFUtils.distance(from: coordinates, to: centerPoint)

                if distance <= radiusInM {
   
                    var driver = DriverDetails(address: document.data()["driver"] as! String)
                    
                    if driverMap.contains(where: { $0.key.hasPrefix(driver.address) }){
                        // Driver already listed
                        //print("Driver already listed")
                    }else{
                        
                        let carAnnotationView = CarAnnotation()
                        carAnnotationView.title = driver.address
      
                        // Add driver pointAnnotation to driverPoints
                        let index = driverPoints.count
                        driverPoints.append(carAnnotationView)
                        
                        let info = DriverInfo(address: driver.address, isDriver: nil, rate: nil, carAssetLink: "", infoAssetLink: "",twitterHandle:twitter, facebookHandle: facebook)
                        
                        // Maps driver address to MKPoint array index
                        driverMap[driver.address] = index
                        driver.info = info
     
                        drivers.append(driver)
                        
                        // Get driver details from smart contract
                        getDriverDetails(details:driver, index: index)
                        getDriverRating(details:driver,index:index)
                        // List for location changes in realTime DB
                        listenForChanges(driver: driver.address)
                    }
                
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
