// SPDX-License-Identifier: GPLv3
// koral.earth smart contracts

pragma solidity ^0.8.0;

/**
 * @title Administrable
 * @dev This guarantees administration power to the system that inherits this contract
 */
abstract contract Administrable {
  
  address internal admin;

  function isAdmin() internal view returns (bool)  {
    return msg.sender == admin;
  }
  
  function assignNewAdmin(address _admin) internal {
    admin = _admin;
  }
}
