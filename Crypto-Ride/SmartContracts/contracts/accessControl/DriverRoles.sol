// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

/**
 * @title Roles
 * @author Mitchell Tucker
 */

contract DriverRole {
    
    // Could add a deposite fee for drivers 
    // TODO add benifactor address for driver prevent them becoming targets
    struct Driver {
        bool isDriver;          
        uint256 rate;           // Driver rate 
        bytes carAssetUrl;      // Car image and description ie four door , two door color
        bytes infoAssetUrl;     // Driver image, name , age
        RatingReputation rr;
    }

    struct Passenger {
        bool suspended;         // Could also suspend passengers 
        RatingReputation rr;    // Rating and reputation for passengers 
    }
    

    struct RatingReputation{
        uint256 rating;         // percent based from 5 star 100% == 5
        uint256 reputation;     // points for successful drive
        uint256 count;          // Amount of rides
    }


    mapping(address => Driver) public drivers;
    mapping(address => RatingReputation) public passengers; // rating and reputation for passengers
    
    /**
    * Add the driver role to a address 
    * @dev 
    */
    function addDriver(uint256 _startingRate, bytes memory _carAssetUrl, bytes memory _profileAssetUrl) 
    public {
        Driver memory driverDetails;
        require(!driverDetails.isDriver); // Cant add driver is msg.sender is already a driver
        driverDetails.rate = _startingRate;
        driverDetails.carAssetUrl = _carAssetUrl;
        driverDetails.infoAssetUrl = _profileAssetUrl;
    }

    /**
    * Allows a driver to update there rate 
    * @dev 
    */
    function updateRate(uint256 _newRate) public {
        Driver memory driverDetails = drivers[msg.sender];
        // msg.sender must be a driver 
        require(driverDetails.isDriver); 
        driverDetails.rate = _newRate;
        drivers[msg.sender] = driverDetails; 
    }




}

