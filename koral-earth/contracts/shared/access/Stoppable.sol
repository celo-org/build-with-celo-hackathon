// SPDX-License-Identifier: GPLv3
// koral.earth smart contracts

pragma solidity ^0.8.0;

/**
 * @title Stoppable
 * @dev This provides a contract with the ability to be stopped
 */
abstract contract Stoppable {
  
  bool public stopped = false;
  
  modifier stopInEmergency { if (!stopped) _; }

  modifier onlyInEmergency { if (stopped) _; }

  function stop() public {
    stopped = true;
  }

  function resume() public {
    stopped = false;
  }
}
