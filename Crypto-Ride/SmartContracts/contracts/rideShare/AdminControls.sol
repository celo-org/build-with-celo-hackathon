// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title RideManager
 * @author Mitchell Tucker
 * @dev All methods are only callable by contract owner
 */
contract AdminControls is Ownable, Pausable {

uint256 internal driverAcceptanceTime = 30;

/**
* @dev setDriverWindow  
*
* @param _newTime uint256 of the driver acceptance window
*
*/
function setDriverWindow(uint256 _newTime)
public 
onlyOwner
{
    driverAcceptanceTime = _newTime;
}

/**
* @dev pause
* Pause the inherit contract
* 
*/
function pause() 
public
onlyOwner
{
    _pause();
}

/**
* @dev unpause
* unpause the inherit contract
*
*/
function unpause() 
public
onlyOwner
{
    _unpause();
}


}