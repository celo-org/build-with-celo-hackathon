// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

struct Dormant {
  // address[50][] addrHistory;
  address trustee;
  uint96 poolId;
}

abstract contract Dormancy {
  // uint96 public dormant;

  /**
   @dev Record dormant pools: i.e cleared slots can be reused.
        It will be very helpful in reducing gas cost.
  */
  // mapping (uint96=>Dormant) public dormantPools;
  Dormant[] private dormantPools;

  modifier restricted() {
    if(msg.sender != address(this)) revert('Restricted');
    _;
  }

  //Increment dormant counter 
  // function _decrementDormant() internal restricted { dormant --; }
  
  //Decrement dormant counter
  // function _incrementDormant() internal  restricted returns(uint96 newCount) { 
  //   dormant ++; 
  //   newCount = dormant; 
  // }

  /**@dev Pushes to dormant list.
   * @param trustee - Trustee address.
   * @param poolId - Pool Index.
   */
  function _pushToDormant(address trustee, uint96 poolId) internal restricted {
    dormantPools.push(Dormant(trustee, poolId));
  }

  // Search for dormant pool
  function searchForDormant() internal view restricted returns(address trustee, uint96 poolId) {
    uint size = dormantPools.length;
    if(size == 0) return (trustee, poolId);
    for(uint i = 0; i < size; i++) {
      trustee = dormantPools[i].trustee;
      if(trustee != address(0)) {
        poolId = dormantPools[i].poolId;
        break;
      }
    }
  }
}