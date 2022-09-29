// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract AdminControls is Ownable, Pausable {

uint256 internal driverAcceptanceTime = 30;

function setDriverWindow(uint256 _newTime)
public 
onlyOwner
{
    driverAcceptanceTime = _newTime;
}

function pause() 
public
onlyOwner
{
    _pause();
}

function unpause() 
public
onlyOwner
{
    _unpause();
}


}