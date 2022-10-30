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
    
    // selected drivers for annoucing ride
    //@Published var selectedDrivers:[DriverDetails] = []
    @Published var rejectedDrivers:[DriverDetails] = []
    
    @Published var drivers:[DriverDetails] = []
    
    @Published var driverPoints:[CarAnnotation] = []

    // Selecting Annotations on mapView
    @Published var selectedDriver:DriverDetails?
    @Published var selectedAnnotation:CarAnnotation?
    
    // Avarge price of ride When building route
    @Published var normalizedPrice:Double = 0.00
    @Published var route:MKRoute?
    
    // Map driver address to point index
    private var driverMap:[String:Int] = [:]
    
    private let manager = CLLocationManager()
    
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
                //print("Fetching local drivers")
                geoQuery(userLocation: $0.coordinate)
      
            }
        }
    
    // MARK: getRideEstimates
    // Uses driver rate and route to estimate ride cost
 
    func getRideEstimates() {
  
        //var ratesWithDriver:[DriverDetails] = []
        if(route == nil){return}
        var total = 0.0
        for index in drivers.indices {
            let rate = Double(drivers[index].info!.rate!)
            if rate == 0.0{break}
                // TODO take the amount of drivers and avarage the rates to get a normalized price
            let priceWithDriverRate = 60 / rate
            let driverRateAppliedToRide = route!.expectedTravelTime *  (priceWithDriverRate / 60)
            total += driverRateAppliedToRide
            drivers[index].rateAppliedToRide = driverRateAppliedToRide
        }
        normalizedPrice = total / Double(drivers.count)
        print(normalizedPrice)
    }
    
    
    
    // MARK: listenForChanges
    /// Updates driver locations and pin annotations
    func listenForChanges(driver:String) {
        
        let ref = Database.database().reference().child("driver").child(driver)
        
        //refHandle = postRef.observe(DataEventType.value, with: { snapshot in
        ref.observe(.value, with: {(snapshot) in
            let driverAddress = snapshot.key as String
            let driverLocation = snapshot.value as? [String:Any]
            if driverLocation == nil {return}
            
            let lat = driverLocation!["lat"] as! Double
            let long = driverLocation!["long"] as! Double
                             
            let index = self.driverMap[driverAddress]
            
            let newLocation = CLLocationCoordinate2D(latitude: lat, longitude: long)
            
            self.driverPoints[index!].coordinate = newLocation
        
        })
    }
    
    
    func getDriverDetails(details:DriverDetails,index:Int){
        let params = [details.address] as [AnyObject]
        ContractServices.shared.read(contractId: .RideManager, method: RideManagerMethods.getDriverRate.rawValue, parameters: params)
        { result in
            DispatchQueue.main.async { [unowned self] in
                //isLoading = false
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
    
    func getDriverRating(details:DriverDetails,index:Int){
        let params = [details.address] as [AnyObject]
        ContractServices.shared.read(contractId: .RideManager, method: RideManagerMethods.getReputation.rawValue, parameters: params)
        { result in
            DispatchQueue.main.async { [unowned self] in
                //isLoading = false
                switch(result){
                case .success(let result):
                    let rawStats = result["0"] as! [AnyObject]
                    let rating  = rawStats[0] as! BigUInt
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
    
    
    // MARK: geoQuery
    /// Queries local driver info based on users geo location
    ///
    /// - Note: Read data from FireBase.
    ///
    /// - Parameters:
    ///                 - `userLocation`: CLLocationCoordinate2D of passenger.
    ///
    func geoQuery(userLocation:CLLocationCoordinate2D) {
     
        // Find drivers within 50 miles of passenger
        let radiusInM: Double = 50 * 1000

        
        // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
        // a separate query for each pair. There can be up to 9 pairs of bounds
        // depending on overlap, but in most cases there are 4.
        let queryBounds = GFUtils.queryBounds(forLocation: userLocation,
                                              withRadius: radiusInM)
        
        let queries = queryBounds.map { bound -> Query in
            return db.collection("cities").document("SF").collection("Drivers")
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
                let distance = GFUtils.distance(from: centerPoint, to: coordinates)
            
                if distance <= radiusInM {
                    var driver = DriverDetails(address: document.data()["driver"] as! String)
                    
                    if driverMap.contains(where: { $0.key.hasPrefix(driver.address) }){
                        // Driver already listed
                        print("Driver already listed")
                    }else{
                      
                        //let carView = CarAnnotationView
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
