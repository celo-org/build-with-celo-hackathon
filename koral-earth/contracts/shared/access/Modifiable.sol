// SPDX-License-Identifier: GPLv3
// koral.earth smart contracts

pragma solidity ^0.8.0;

/**
 * @title Interactable
 * @dev This guarantees the terms of modifiability of a system that inherits this contract
 */
abstract contract Modifiable {
  
  bool internal isFinal = false;

  modifier isModifiable {
    require(!isFinal, "Modifiable: This system can no longer be modified."); _;
  } 

  function makeFinal() internal {
    isFinal = true;
  }
}
