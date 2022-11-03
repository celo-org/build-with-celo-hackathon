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

class LocationManager: NSObject,CLLocationManagerDelegate,ObservableObject {
    
    @Published var region = MKCoordinateRegion()
    @Published var updateRegion = false
    
    @Published var snapToRoute = false
    @Published var clean = false
    
    @Published var rejectedDrivers:[DriverDetails] = []
    @Published var drivers:[DriverDetails] = []
    
    
    // Set driver address to point index
    private var driverMap:[String:Int] = [:]
    // List of driver annotations
    @Published var driverPoints:[CarAnnotation] = []
    
    @Published var removeAnnotation:MKAnnotation? = nil

    // Selecting Annotations on mapView
    @Published var selectedDriver:DriverDetails?
    @Published var selectedAnnotation:CarAnnotation?
    
    // Avarge price of ride When building route
    @Published var normalizedPrice:Double = 0.00
    @Published var route:MKRoute?
    
    private let manager = CLLocationManager()
    // Max distance away from drivers
    private let radiusInM: Double = 5 * 1000
    
    @Published var currentLocation:CLLocation?
    private var lastGeocodeTime:Date? = Date()

    private var db:Firestore!
    
    override init() {
        super.init()

        //FirebaseApp.configure()
        db = Firestore.firestore()
        
        manager.delegate = self
        manager.desiredAccuracy = kCLLocationAccuracyBest
        manager.requestWhenInUseAuthorization()
        manager.startUpdatingLocation()
    }
    
    
    
    // MARK: changeRegion
    /// Snaps map to a driver annotation
    public func changeRegion(driver:String) {
        let driverIndex = driverMap[driver]
        selectedAnnotation = driverPoints[driverIndex!]
        region = MKCoordinateRegion(center: driverPoints[driverIndex!].coordinate , span: MKCoordinateSpan(latitudeDelta: 0.02, longitudeDelta: 0.02))
        updateRegion = true
    }
    
    public func cleanMapView() {
        clean = true
        //route = nil
    }
    

    // MARK: locationManager
    /// Updates user location on the mapView
    /// Passes user location into geoQuery use to find local driver
    ///
    /// Parameters:
    ///     - `manager` CLLocation Manager for delegate call
    ///     - `locations` update user locations
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
                    // get
                    let city =  place.first?.locality ?? ""
                    //TODO Throw if city is empty
                    // get local drivers for are current location
                    geoQuery(userLocation: coords,city: city)
 
                }
             
            }
          
      
            }
        }
    
    // MARK: getRideEstimates
    /// Uses driver rate and route to estimate ride cost
    /// Sets the normalized ride price avarging driver rates
    func getRideEstimates() {
        
        if(route == nil){return}
        var total = 0.0
        for index in drivers.indices {
      
            if (drivers[index].info == nil) {return}
            if (drivers[index].info!.rate == nil) {return}
            let rate = Double(drivers[index].info!.rate!)
            if rate == 0.0{break}
            
            let priceWithDriverRate = 60 / rate
            let driverRateAppliedToRide = route!.expectedTravelTime *  (priceWithDriverRate / 60)
            total += driverRateAppliedToRide
            drivers[index].rateAppliedToRide = driverRateAppliedToRide
        }
        normalizedPrice = total / Double(drivers.count)
    }
    
    
    // MARK: getDriverDetails
    ///
    /// Parameters
    ///     - details
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
                        carAssetLink: details.info!.carAssetLink,
                        infoAssetLink: details.info!.infoAssetLink)
                    
                    //getRideEstimates(index: index, rate: Double(rate))
                    
                    self.drivers[index].info = driverInfo
                   
                case .failure(let error):
                    print("Failed to get driver details")
                    //self.error = ContractError(title: "Failed to get driver rate.", description: error.errorDescription)
                }
            }
        }
    }
    
    
    // MARK: getDriverDetails
    ///
    /// Parameters
    ///     - details
    func getDriverRating(details:DriverDetails,index:Int){
        let params = [details.address] as [AnyObject]
        ContractServices.shared.read(contractId: .RideManager, method: RideManagerMethods.getReputation.rawValue, parameters: params)
        { result in
            DispatchQueue.main.async { [unowned self] in
                //isLoading = false
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
                    print("Failed to get driver details")
                    //self.error = ContractError(title: "Failed to get driver rate.", description: error.errorDescription)
                }
            }
        }
    }
    
    
    
    // MARK: listenForChanges
    /// Updates driver locations and pin annotations
    /// Remove drivers that sure pass passenger distance
    func listenForChanges(driver:String) {
        
        let ref = Database.database().reference().child("driver").child(driver)
        
        ref.observe(.value, with: { [ self](snapshot) in
            
            let driverAddress = snapshot.key as String
            let driverLocation = snapshot.value as? [String:Any]
            if driverLocation == nil {return}
            
            let lat = driverLocation!["lat"] as! Double
            let long = driverLocation!["long"] as! Double
                             
            let index = self.driverMap[driverAddress]
            
            let newLocation = CLLocationCoordinate2D(latitude: lat, longitude: long)
            let driverCL = CLLocation(latitude:lat, longitude: lat)
            let distanceAway = driverCL.distance(from: currentLocation!)
         
            //if distanceAway > radiusInM {
                // Remove annoatation if driver is too far away
                //removeAnnotation = driverPoints[index!]
                //ref.root
                //ref.removeObserver(withHandle: driverAddress)
            //}
        
            self.driverPoints[index!].coordinate = newLocation
            
            //if selectedAnnotation != nil && updateRegion {
            if self.driverPoints[index!] == selectedAnnotation{
                changeRegion(driver: driverAddress)
            }
            //}
        
        })
    }
    
    // MARK: geoQuery
    /// Queries local driver info based on users geo location
    ///
    /// - Note: Read data from FireBase.
    ///
    /// - Parameters:
    ///                 - `userLocation`: CLLocationCoordinate2D of passenger.
    ///
    func geoQuery(userLocation:CLLocationCoordinate2D,city:String) {
     
        // Find drivers within 5000 meters of passenger
  

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
                
                let name = document.data()["name"] as? String ?? ""
                let car = document.data()["car"] as? String ?? ""
                
                let coordinates = CLLocation(latitude: lat, longitude: lng)
                let centerPoint = CLLocation(latitude: userLocation.latitude, longitude: userLocation.longitude)
                
                // We have to filter out a few false positives due to GeoHash accuracy, but
                // most will match
                //let distance = centerPoint.distance(from: coordinates)
                let distance = GFUtils.distance(from: coordinates, to: centerPoint)

                if distance <= radiusInM {
                    var driver = DriverDetails(address: document.data()["driver"] as! String)
                    
                    if driverMap.contains(where: { $0.key.hasPrefix(driver.address) }){
                        // Driver already listed
                        print("Driver already listed")
                    }else{
                      
                        let carAnnotationView = CarAnnotation()
                        carAnnotationView.title = driver.address
                        //carAnnotationView.coordinate =
                        //carAnnotationView.image = UIImage(named: "car.circle")
                        //carAnnotationView.colour = UIColor.blue
                        
                        //carAnnotationView.coordinate = CLLocationCoordinate2D(latitude: CLLocationDegrees(lat), longitude: CLLocationDegrees(lng))
                        
                        //let driverPoint = MKPointAnnotation()
                        //driverPoint.title = driver.address
          
                    
                        // Add driver pointAnnotation to driverPoints
                        let index = driverPoints.count
                        driverPoints.append(carAnnotationView)
                        
                        let info = DriverInfo(address: driver.address, isDriver: nil, rate: nil, carAssetLink: car, infoAssetLink: name)
                        
                        // Maps driver address to MKPoint array index
                        driverMap[driver.address] = index
                        driver.info = info
                        
                        drivers.append(driver)
                        
                        // Get driver details from smart contract
                        print("Getting driver details and rating")
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
