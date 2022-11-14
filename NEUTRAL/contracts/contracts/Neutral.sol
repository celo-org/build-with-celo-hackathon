// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Neutral {
    mapping (address => uint) offsetTillNow;

    function updateCarbonOffset(address _address, uint _carbonToBeAdded)  public{
        offsetTillNow[_address] += _carbonToBeAdded;
    }

    function viewCarbonOffset(address _address) public view returns(uint){
        return offsetTillNow[_address];
    }
}