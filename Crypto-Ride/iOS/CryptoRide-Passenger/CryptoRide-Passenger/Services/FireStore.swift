//
//  FireStore.swift
//  CryptoRide-Passenger
//
//  Created by mitchell tucker on 9/14/22.
//

import Foundation
import GeoFire
import FirebaseCore
import FirebaseFirestore
import FirebaseDatabase


class FireStore:NSObject {
    
    static let shared = FireStore()
    
    var db:Firestore!
    
    override init() {
        FirebaseApp.configure()
        db = Firestore.firestore()
    }
    
    
    func listenForDriverLocations() {
        let decoder = JSONDecoder()
        
        let databasePath: DatabaseReference? = {
            
            let ref = Database.database()
                .reference()
                .child("driver/0x939E2018fd7011E06C4fD55B2aC3de97805Ed7ed")
            return ref
        }()
  
        guard let databasePath = databasePath else {
            return
        }
        
        
        databasePath
            .observe(.value) { [weak self] snapshot in
                
                guard
                    
                    let json = snapshot.value as? [String: Any]
                    
                else {
                    return
                }
                print(json)
                do {
         
                    let driverData = try JSONSerialization.data(withJSONObject: json)
                    
                    let driverLocation = try decoder.decode(Location.self, from: driverData)
                    
                    print(driverLocation)
                    // Add driver pin to map
                    //self!.driverPin.coordinate = CLLocationCoordinate2D(
                    //    latitude:CLLocationDegrees(driverLocation.lat) ,
                    //    longitude:CLLocationDegrees(driverLocation.long)
                    //)
                    
                } catch {
                    print("an error occurred", error)
                }
            }
    }
    
    
    
}
