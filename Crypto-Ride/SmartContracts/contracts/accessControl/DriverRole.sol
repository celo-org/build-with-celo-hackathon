// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

// Import the library 'Roles'
//import "./Roles.sol";

// Define a contract 'RetailerRole' to manage this role - add, remove, check
contract DriverRole {
  //using Roles for Roles.Role;

  // Could add a deposite fee for drivers 
  // TODO add benifactor address for driver prevent them becoming targets
  struct Driver {
      bool isDriver;          
      uint256 rate;           // Driver rate 
      bytes carAssetUrl;      // Car image and description ie four door , two door color
      bytes infoAssetUrl;     // Driver image, name , age
  }

  // Define 2 events, one for Adding, and other for Removing
  //event DriverAdded(address indexed account);
  //event DriverRemoved(address indexed account);
  
  //Roles.Role private drivers;
  mapping(address => Driver) public drivers;
  
  //constructor() public {
  //  _addDriver(msg.sender);
  //}

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyDriver() {
     require(isDriver(msg.sender));
    _;
  }

  //  check this role
  function isDriver(address account) public view returns (bool) {
    return drivers[account].isDriver;
  }

  /**
  * @dev Adds driver
  *
  */
  function addDriver(uint256 _startingRate, bytes memory _carAssetUrl, bytes memory _profileAssetUrl) public {
    Driver memory driverDetails;
    driverDetails.isDriver = true;
    driverDetails.rate = _startingRate;
    driverDetails.carAssetUrl = _carAssetUrl;
    driverDetails.infoAssetUrl = _profileAssetUrl;
    drivers[msg.sender] = driverDetails;
    //_addDriver(account);
  }

  /**
  * @dev Allows driver to update rate
  *
  */
  function updateRate(uint256 _newRate) public 
  
  {
      Driver memory driverDetails = drivers[msg.sender];
      // msg.sender must be a driver 
      require(driverDetails.isDriver); 
      driverDetails.rate = _newRate;
      drivers[msg.sender] = driverDetails; 
  }


  //  renounce this role
  //function renounceDriver() public {
  //  _removeDriver(msg.sender);
  //}

  // Define an internal function '_addRetailer' to add this role, called by 'addRetailer'
  //function _addDriver(address account) internal {
  //  drivers.add(account);
    //emit DriverAdded(account);
  //}

  // Define an internal function '_removeRetailer' to remove this role, called by 'removeRetailer'
  //function _removeDriver(address account) internal {
  //  drivers.remove(account);
  //  emit DriverRemoved(account);
  //}
}