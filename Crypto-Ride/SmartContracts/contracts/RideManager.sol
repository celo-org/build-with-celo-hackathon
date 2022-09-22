// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import '../accessControl/DriverRoles.sol';

/**
 * @title DriverDetails
 * @author Mitchell Tucker
 * @dev DriversDetails.
 *
 * TODO make contract ownable 
 *
 */

contract RideManager is DriverRoles {

    event DriversForRide(address[] drivers);
    event DriverAcceptedRide(bytes32 rideId,address driver);

    struct Ride {
        uint256 startLocation;
        uint256 endLocation;
        uint256 price;
        uint256 time;
        address[] drivers;
        address acceptedDriver;
    }

    mapping(bytes32 => Ride) rides; 

    /**
     * announceRide passenger ride on the network
     *  
     * TODO need padding between long and lat for each location
     * _startLocation: starting coordinate point
     * _endLocation: ending coordinate point
     * _drivers: address array, drivers selected for the ride
     * _price: price for the ride in ETH
     *
     * TODO add ride share ability 
     */

    function announceRide(uint256 _startLocation, uint256 _endLocation,address[] memory _drivers, uint256 _price)
    payable 
    public 
    {
        // Create ride struct 
        Ride memory ride;
        ride.startLocation = _startLocation;
        ride.endLocation = _endLocation;
        ride.price = _price;
        ride.drivers = _drivers;
        ride.time = block.timestamp;
        // Set ride within mapping 
        rides[keccak256(abi.encode(ride))] = ride; 
        // Emit new ride with selected drivers
        emit DriversForRide(_drivers);
    }

    /**
     * driverAcceptsRide
     * Drivers have a 30 second window to accept a ride
     *
     * rideId: Bytes32 hash of the ride
     *
     * TODO make driver window time adjustable by owner
     */

    function driverAcceptsRide(bytes32 rideId) 
    public 
    {   
        Ride memory ride = rides[rideId];
        
        uint256 timeElapsed = ride.time - block.timestamp;
        uint256 driverIndex = timeElapsed / 30;  

        require(msg.sender == ride.drivers[driverIndex]); // Check if msg.sender is driver at index
        // Set driver state to current ride
        ride.acceptedDriver = ride.drivers[driverIndex];
        // Emit the ride has been accepted
        emit DriverAcceptedRide(rideId, ride.drivers[driverIndex]);

    }

    function passengerConfirmsPickUp(){

    }

    function driverConfirmsDropOff() {
        
    }

    function passengerConfirmsDropOff() {
        
    }

    

}