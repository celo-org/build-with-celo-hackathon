// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'RetailerRole' to manage this role - add, remove, check
contract PassengerRole {
  using Roles for Roles.Role;

    //struct Passenger {
    //    bool suspended;         // Could also suspend passengers 
    //    RatingReputation rr;    // Rating and reputation for passengers 
    //}

  event PassengerAdded(address indexed account);
  event PassengerRemoved(address indexed account);
  
 
  Roles.Role private passengers;
  
  constructor() public {
    _addPassenger(msg.sender);
  }


  modifier onlyPassenger() {
     require(isPassenger(msg.sender));
    _;
  }


  function isPassenger(address account) public view returns (bool) {
    return passengers.has(account);
  }


  function addPassenger(address account) public onlyPassenger {
    _addPassenger(account);
  }


  function renouncePassenger() public {
    _removePassenger(msg.sender);
  }

  function _addPassenger(address account) internal {
    passengers.add(account);
    emit PassengerAdded(account);
  }

  function _removePassenger(address account) internal {
    passengers.remove(account);
    emit PassengerRemoved(account);
  }
}