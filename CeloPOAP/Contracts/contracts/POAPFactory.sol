//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
pragma experimental ABIEncoderV2;

import "hardhat/console.sol";


import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";
import {IPOAPMarket} from "./POAPMarket.sol";
import "./POAP.sol";

contract POAPFactory is   Ownable {
    using Counters for Counters.Counter;

    // Add the library methods
    using EnumerableMap for EnumerableMap.UintToAddressMap;
    
    // Declare a set state variable
    EnumerableMap.UintToAddressMap private _events;

    Counters.Counter private _counter;

    mapping(address => uint256[]) private _ownersEvents; //owneraddress -> eventIndex
    
    uint256 private fee;

    
    event eventAdded(address owner, uint256 eventID);
    IPOAPMarket public _poapMarket;

    constructor(IPOAPMarket poapMarket)  
    {
        fee = 0.0001 * 10 ** 18;
        _poapMarket=poapMarket;
        
    }



    /**
    * @dev Create A new Event.
    */
    function createNewEvent(POAP.EventStruct memory eventDetails, string memory eventCode) public payable  {
        
        require(msg.value >= fee, 'POAPFactory: Requires Event Creation Price' );
   
        _counter.increment(); 
        
        eventDetails.eventOwner= msg.sender;
        
        address payable newEventAddress = payable(address(new POAP("POAP", "POAP", eventDetails, eventCode, _poapMarket) ) );

        _events.set(_counter.current(), newEventAddress);
        _ownersEvents[msg.sender].push( _counter.current());        
        
        emit eventAdded(msg.sender, _counter.current());

        
    }


    

    //offset 
    function allOwnersEvents(uint256 start, uint256 offset) public view returns (uint256[] memory) {
        uint256[] memory list = new uint256[](offset) ;
        for (uint256 i=start; i < start + offset ; i++) {
            list[i-start] = _ownersEvents[msg.sender][i]; 
        }
        return list;
    }

    
    function eventsSize() public view returns (uint256) {
        return _events.length();
    }

       

    function contains(uint256 key) public view returns (bool) {
        return _events.contains(key);
    }

        

    function eventAt(uint256 index) public view returns (uint256 key, address value) {
        return _events.at(index);
    }

    function tryGetEventByKey(uint256 key) public view returns (bool, address) {
        return _events.tryGet(key);
    }

    
}