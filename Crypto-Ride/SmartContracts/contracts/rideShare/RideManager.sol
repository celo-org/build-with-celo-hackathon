// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../reputationManager/ReputationManager.sol';

import './AdminControls.sol';
// Modulars 
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


/**
 * @title RideManager
 * @author Mitchell Tucker
 * @dev 
 *
 * TODO make contract ownable 
 *
 */

contract RideManager is ReputationManager, AdminControls {

    address constant private cUSD = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    event DriversForRide(address[] drivers);
    event DriverAcceptedRide(bytes32 rideId,address driver);
    event StateChanged(bytes32 rideId);
    event RideCanceled(bytes32 rideId);
 

    enum RideState {
        None,
        Announced,
        DriverAccepted,
        PassengerPickUp,
        DriverDropOff,
        Complete,
        Canceled
    }

    struct Coordinate {
    uint256 lat;
    uint256 long;
    }

    struct Ride {
        bool shared;
        Coordinate startCoordinate;
        Coordinate endCoordinate;
        uint256 price;
        uint256 time;
        address acceptedDriver;
        address passenger;
        RideState state;

    }

    mapping(address => bytes32) activeRides; // Links passenger & driver to there current active ride
    //mapping(address => uint256) balance;

    // Note this keeps cost down as the drivers arrays isn't encoded every function
    mapping(bytes32 => address[]) proposedDrivers; // drivers for announcedRides 
    mapping(bytes32 => Ride) rides; 

    modifier _inRide {
        require(activeRides[msg.sender] == 0,"You must complete or cancel your current ride.");
        _;
    }


    //constructor() {
    //    owner = msg.sender;
    //}


    /**
     * announceRide passenger ride on the network
     *  
     * 
     * _startLocation: starting coordinate point
     * _endLocation: ending coordinate point
     * _drivers: address array, drivers selected for the ride
     * _price: price for the ride in ETH
     *
     * TODO add ride share ability 
     * 
     */

    function announceRide(Coordinate memory _startLocation, Coordinate memory _endLocation,address[] memory _drivers, uint256 _price, bool _shared)
    payable 
    public 
    whenNotPaused
    _inRide
    {
        // Assert if msg.sender didn't send correct token price
        IERC20 token = IERC20(cUSD);
        //require(token.allowance(msg.sender, address(this)) >= _price,"Insuficient Allowance");
        require(token.transferFrom(msg.sender,address(this),_price),"transfer Failed");
        
        // Create ride struct 
        Ride memory ride;
        ride.startCoordinate = _startLocation;
        ride.endCoordinate = _endLocation;
        ride.price = _price;
        ride.shared = _shared;          // Ride is shared
        ride.passenger = msg.sender; 
        ride.time = block.timestamp;
        ride.state = RideState.Announced;

        bytes32 rideId = keccak256(abi.encode(ride));

        // proposed drivers for ride 
        proposedDrivers[rideId] = _drivers;

        // ride in rides
        rides[rideId] = ride; 

        // active rides for the passenger 
        activeRides[msg.sender] = rideId;
        
        // Emit new ride with selected drivers
        emit DriversForRide(_drivers);
    }

    /**
     * driverAcceptsRide
     * Drivers have a 30 second window to accept a ride
     *
     * rideId: Bytes32 hash of the ride
     * Only callable by driver
     * TODO make driver window time adjustable by contractOwner
     */

    function driverAcceptsRide(bytes32 rideId) 
    payable
    public 

    {   
        Ride memory ride = rides[rideId];
        //require(ride.state.none == RideState.None,"No ride exist"); // Check if ride state 
        require(ride.state == RideState.Announced); // Check ride state 
        
        uint256 timeElapsed = ride.time - block.timestamp;
        uint256 driverIndex = timeElapsed / driverAcceptanceTime;  

        address[] memory drivers = proposedDrivers[rideId];
        require(msg.sender == drivers[driverIndex]); // Check if msg.sender is driver at index

        // Set driver state to current ride
        ride.acceptedDriver = drivers[driverIndex];
        ride.state = RideState.DriverAccepted;
        rides[rideId] = ride;
        activeRides[msg.sender] = rideId; // Driver is in a activeRide 
        // Emit the ride has been accepted
        emit DriverAcceptedRide(rideId, drivers[driverIndex]);

    }

    /**
     * passengerConfirmsPickUp
     * 
     * Update ride state to PassengerAcceptedPickUp
     * 
     */

    function passengerConfirmsPickUp(bytes32 rideId)
    public

    {
        Ride memory ride = rides[rideId];
        require(ride.state == RideState.DriverAccepted);
        require(ride.passenger == msg.sender);
        ride.state = RideState.PassengerPickUp;
        rides[rideId] = ride;
        emit StateChanged(rideId);
    }

    /**
     * @dev driverConfirmsDropOff
     * 
     * Update ride state to driverConfirmsDropOff
     */

    function driverConfirmsDropOff(bytes32 rideId,uint256 _passengerRating)
    public

    {
        Ride memory ride = rides[rideId];

        //require(ride.passenger.length != 0,"No ride exist"); // Check if ride state 
        require(ride.state == RideState.PassengerPickUp);
        require(ride.acceptedDriver == msg.sender); // Only callable by driver 

        ride.state = RideState.DriverDropOff;
        rides[rideId] = ride;
        updateReputation(ride.passenger,_passengerRating,10,false);
        // Emit state
        emit StateChanged(rideId);
    }

    /**
     * @dev passengerConfirmsDropOff
     * 
     * Update ride state to passengerConfirmsDropOff
     */

    function passengerConfirmsDropOff(bytes32 rideId,uint256 driverRating) 
    public

    {
        // Update ridestate passenger confirms dropoff
        Ride memory ride = rides[rideId];

        //require(ride.passenger.length != 0,"No ride exist"); // Check if ride state 
        require(ride.state == RideState.DriverDropOff,"Driver must confirm dropOff");
        require(ride.passenger == msg.sender); // Only callable the passenger

        ride.state = RideState.Complete;

        // transfer tokens from passenger to driver 
        IERC20 token = IERC20(cUSD);
        //require(token.allowance(address(this), ride.acceptedDriver) >= ride.price,"Contract is broke");
        // TODO transfer cUSD from msg.sender to CELOS escrow 
        require(token.transferFrom(address(this),ride.acceptedDriver ,ride.price),"transfer Failed");

        // Update passenger and driver R&R 
        updateReputation(ride.acceptedDriver,driverRating,10,false);

        emit StateChanged(rideId);
    }

    /**
     * @dev cancelRide
     * 
     * Allows driver or passenger to cancel a ride 
     * 
     * 
     * TODO Implment refund amounts and optimize
     */
    function cancelRide(bytes32 rideId)
    public
    {

        Ride memory ride = rides[rideId];
        require(ride.state != RideState.None || ride.state != RideState.Canceled,"No ride exist");
        // Only callable by passenger and driver 
        require(ride.passenger == msg.sender ||ride.acceptedDriver == msg.sender , "Method is only callable by driver or passenger");

        IERC20 token = IERC20(cUSD);
        // Check what state the ride is in and refund 
        if(ride.state == RideState.Announced){
            // refund all tokens back to passenger
            require(token.transferFrom(address(this),ride.passenger,ride.price),"transfer Failed");
            
        }else if(ride.state == RideState.DriverAccepted){
            // Passenger 90
            require(token.transferFrom(address(this),ride.passenger ,ride.price),"transfer Failed");
            // Driver 10
            require(token.transferFrom(address(this),ride.acceptedDriver ,ride.price),"transfer Failed");

        }else if(ride.state == RideState.PassengerPickUp){
            // Passenger 50
            require(token.transferFrom(address(this),ride.passenger ,ride.price),"transfer Failed");
            // Driver 50
            require(token.transferFrom(address(this),ride.acceptedDriver ,ride.price),"transfer Failed");

        }else if(ride.state == RideState.DriverDropOff){
            // Passenger 30
            require(token.transferFrom(address(this),ride.passenger ,ride.price),"transfer Failed");
            // Driver 80
            require(token.transferFrom(address(this),ride.acceptedDriver ,ride.price),"transfer Failed");

        }   
        // Decrease R&R from msg.sender
        updateReputation(msg.sender,0,10,true);
        emit RideCanceled(rideId);
    }


}