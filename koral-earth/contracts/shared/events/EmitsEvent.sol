// SPDX-License-Identifier: GPLv3
// koral.earth smart contracts

pragma solidity ^0.8.0;

/**
 * @title EmitsEvent
 * @dev contract to hold all the events that we emit
 */
abstract contract EmitsEvent {
  
  event ActionDone(bool status, string statement);

  function emitActionSuccess(string memory statement) internal
  {
    emit ActionDone(true, statement);
  }

  function emitActionFailure(string memory statement) internal
  {
    emit ActionDone(false, statement);
  } 
}
