// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../reputationManager/ReputationManager.sol';
import './AdminControls.sol';
import '../roles/DriverRole.sol';

// Modulars 
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title RideManager
 * @author Mitchell Tucker
 * @dev 
 *
 */

contract RideManager is ReputationManager, AdminControls, DriverRole {

    IERC20 _token;

    event DriversForRide(bytes32 rideId,address passenger,address[] drivers);
    event DriverAcceptedRide(bytes32 rideId,address driver);
    event PassengerConfirmsPickUp(bytes32 rideId);
    event DriverConfirmsDropOff(bytes32 rideId);
    event Complete(bytes32 rideId);
    event RideCanceled(bytes32 rideId);
 
    // Ride states 
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

    mapping(address => bytes32) private activeRides; // Links passenger & driver to there current active ride

    // Note this keeps cost down as the drivers arrays isn't encoded every function
    mapping(bytes32 => address[]) private proposedDrivers; // drivers for announcedRides 
    mapping(bytes32 => Ride) private rides; 

    modifier inRide {
        require(activeRides[msg.sender] == 0,"You must complete or cancel your current ride.");
        _;
    }

    modifier notCanceled(bytes32 _rideId) {
        require(rides[_rideId].state != RideState.Canceled,"Ride was canceled");
        _;
    }


    constructor(address token) {
        _token = IERC20(token);
    }

    /**
    * @dev DriverRole override 
    *
    * @param _newRate uint256 of the new rate
    *
    */
    function updateRate(uint256 _newRate) 
    override
    public
    inRide
    {
        super.updateRate(_newRate);
    }

    /**
    * @dev DriverRole overide 
    *
    *
    */
    function removeDriver()
    override
    public
    inRide
    {
        super.removeDriver();
    } 

    /**
    * @dev returns rideId for msg.sender
    *
    * @param _user Bytes32 keccak hash of the ride
    *
    * @return bytes32 keccak hash of the ride
    */
    
    function getActiveRide(address _user)
    public
    view 
    returns(bytes32)
    {
        return(activeRides[_user]);
    }
    
    /**
    * @dev Test function used for debuggin 
    *
    * @param _rideId Bytes32 keccak hash of the ride 
    * 
    * @return address drivers address at a given time
    *
    */
    function driverTime(bytes32 _rideId)
    public
    view
    returns(address)
    {
        Ride memory ride = rides[_rideId];
        uint256 timeElapsed = block.timestamp - ride.time;
        uint256 driverIndex = timeElapsed / driverAcceptanceTime;  
        address[] memory drivers = proposedDrivers[_rideId];
        return(drivers[driverIndex]);
    }
    


    /**
    * @dev returns ride struct given a rideId
    *
    * @param rideId Bytes32 keccak hash of the ride 
    * 
    * @return Ride struct 
    *
    */
    
    function getRide(bytes32 rideId) 
    public
    view
    returns(Ride memory)
    {
        return(rides[rideId]);
    }

    /**
    * @dev returns bool if ride is canceled
    *
    * @param rideId Bytes32 keccak hash of the ride 
    * 
    * @return Bool ride is canceled 
    *
    */
    
    function isCanceled(bytes32 rideId)
    public
    view 
    returns(bool)
    {
        return(rides[rideId].state == RideState.Canceled);
    }
    

    /**
     *@dev announce a passenger ride on the network
     *  
     *@param _startLocation: starting coordinate point
     *@param _endLocation: ending coordinate point
     *@param _drivers: address array, drivers selected for the ride
     *@param _price: price for the ride in ETH
     *
     * TODO add ride share ability 
     * TODO ride price cant be zero
     */

    function announceRide(Coordinate memory _startLocation, Coordinate memory _endLocation,address[] memory _drivers, uint256 _price, bool _shared)
    whenNotPaused
    public 
    inRide
    {   
        require(_price != 0,"Price cant be zero");
        require(_drivers.length != 0,"No drivers selected");

        // Check msg.sender allowance vs ride price
        require(_token.allowance(msg.sender, address(this)) >= _price,"Insufficient Allowance");
        require(_token.transferFrom(msg.sender,address(this),_price),"Transfer Failed");

        // Create ride struct 
        Ride memory ride;
        ride.startCoordinate = _startLocation;
        ride.endCoordinate = _endLocation;
        ride.price = _price;
        ride.shared = _shared;    
        ride.passenger = msg.sender; 
        ride.time = block.timestamp;
        ride.state = RideState.Announced;

        bytes32 rideId = keccak256(abi.encode(ride));

        // proposed drivers for ride 
        proposedDrivers[rideId] = _drivers;

        // set new ride to are rideId
        rides[rideId] = ride; 

        // set active rides for the passenger 
        activeRides[msg.sender] = rideId;
        
        // Emit new ride with selected drivers
        emit DriversForRide(rideId,msg.sender,_drivers);
    }



    /**
     * @dev allows drivers to accept a ride 
     *
     * @param _rideId: Bytes32 keccak hash of the ride
     *
     * note  Only callable by a driver within the announceRide driver array
     * note `driverAcceptanceTime` is how long each driver has to accept the ride
     * 
     *TODO might need to use time oracle
     */

    function driverAcceptsRide(bytes32 _rideId) 
    public 
    notCanceled(_rideId)
    onlyDriver()
    {   
        Ride memory ride = rides[_rideId];
        require(ride.state == RideState.Announced,"Check ride state");
        
        uint256 timeElapsed = block.timestamp - ride.time;
        uint256 driverIndex = timeElapsed / driverAcceptanceTime;  

        // get drivers index 
        address[] memory drivers = proposedDrivers[_rideId];
        require(driverIndex < drivers.length,"Time exceeded drivers time to accept");
        // Check if msg.sender is driver at index
        require(msg.sender == drivers[driverIndex],"Driver not listed"); 

        // Set driver state to current ride
        ride.acceptedDriver = drivers[driverIndex];
        ride.state = RideState.DriverAccepted;
        rides[_rideId] = ride;
        activeRides[msg.sender] = _rideId; // Driver is in a activeRide 
        // Emit the ride has been accepted
        emit DriverAcceptedRide(_rideId, drivers[driverIndex]);

    }



    /**
     * @dev updates ride state to PassengerAcceptedPickUp
     * 
     * @param _rideId: Bytes32 keccak hash of the ride
     *
     * note only callable from ride passenger
     */

    function passengerConfirmsPickUp(bytes32 _rideId)
    public
    notCanceled(_rideId)
    {

        Ride memory ride = rides[_rideId];
        require(ride.state == RideState.DriverAccepted);
        require(ride.passenger == msg.sender);
        ride.state = RideState.PassengerPickUp;
        rides[_rideId] = ride;
        emit PassengerConfirmsPickUp(_rideId);
    }



    /**
     * @dev Updates ride state to driverConfirmsDropOff
     *
     * @param _rideId Bytes32 keccak hash of the ride
     * @param _passengerRating rating of passenger by driver
     * TODO could add time based dropOff if passenger never confirms dropOff
     */

    function driverConfirmsDropOff(bytes32 _rideId,uint256 _passengerRating)
    public
    notCanceled(_rideId)
    validRating(_passengerRating)
    {
        Ride memory ride = rides[_rideId];

        require(ride.state == RideState.PassengerPickUp,"Incorrect ridestate.");
        require(ride.acceptedDriver == msg.sender,"Only callable by driver."); // Only callable by driver 

        ride.state = RideState.DriverDropOff;
        rides[_rideId] = ride;
        updateReputation(ride.passenger,_passengerRating,10,false);
        // Emit state
        emit DriverConfirmsDropOff(_rideId);
    }



    /**
     * @dev Updates ride state to passengerConfirmsDropOff
     * 
     * @param _rideId Bytes32 keccak hash of the ride
     * @param _driverRating rating of driver by passenger
     * 
     */

    function passengerConfirmsDropOff(bytes32 _rideId,uint256 _driverRating) 
    public
    notCanceled(_rideId)
    validRating(_driverRating)
    
    {

        // Update ridestate passenger confirms dropoff
        Ride memory ride = rides[_rideId];

        require(ride.state == RideState.DriverDropOff,"Driver must confirm dropOff.");
        require(ride.passenger == msg.sender,"Only callable by passenger."); // Only callable the passenger

        // Update ride state
        ride.state = RideState.Complete;
        rides[_rideId] = ride;

        // transfer tokens from contract to driver 
        require(_token.transfer(ride.acceptedDriver ,ride.price),"transfer Failed");

        // Update passenger and driver R&R 
        updateReputation(ride.acceptedDriver,_driverRating,10,false);

        // Set passenger active ride back to empty 
        activeRides[ride.passenger] = 0;
        activeRides[ride.acceptedDriver] = 0;

        emit Complete(_rideId);
    }



    /**
     * @dev Allows driver or passenger to cancel ride 
     * 
     * @param _rideId Bytes32 keccak hash of the ride
     * 
     * 
     */
    function cancelRide(bytes32 _rideId)
    public
    notCanceled(_rideId)
    {
    
        Ride memory ride = rides[_rideId];

        require(ride.state != RideState.None,"No Ride exist");
        require(ride.state != RideState.Complete,"Ride compeleted");

        // Only callable by passenger and driver 
        require(ride.passenger == msg.sender || ride.acceptedDriver == msg.sender , "Method is only callable by driver or passenger");

        // Set ride to canceled before transfers
        RideState prevState = ride.state;
        ride.state = RideState.Canceled;
        rides[_rideId] = ride; 

        // Set active ride to zero
        activeRides[ride.passenger] = 0;
        activeRides[ride.acceptedDriver] = 0;

        // Check what state the ride is in and refund 
        if(prevState == RideState.Announced){
            // refund all tokens back to passenger
            require(_token.transfer(ride.passenger,ride.price),"transfer Failed");
            
        }else if(prevState == RideState.DriverAccepted){
            // Passenger 80%
            require(_token.transfer(ride.passenger ,(ride.price / 5) * 4),"transfer Failed");
            // Driver 20%
            require(_token.transfer(ride.acceptedDriver ,ride.price / 5),"transfer Failed");

        }else if(prevState == RideState.PassengerPickUp){
            uint256 half = ride.price / 2;
            // Passenger 50%
            require(_token.transfer(ride.passenger ,half),"transfer Failed");
            // Driver 50%
            require(_token.transfer(ride.acceptedDriver ,half),"transfer Failed");

        }else if(prevState == RideState.DriverDropOff){  // Driver confirms drop off but passenger hasn't
            // Passenger 20%
            require(_token.transfer(ride.passenger ,ride.price / 5),"transfer Failed");
            // Driver 80%
            require(_token.transfer(ride.acceptedDriver ,(ride.price / 5) * 4),"transfer Failed");

        }   
        // Decrease R&R from msg.sender
        updateReputation(msg.sender,0,10,true);
        emit RideCanceled(_rideId);
    }

}