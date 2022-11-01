// SPDX-License-Identifier: GPLv3
// koral.earth smart contracts

pragma solidity ^0.8.0;

import "../../colony/Plankton.sol";
import "../../colony/Zoox.sol";
import "../../colony/Contribution.sol";

library Koral {
  function canAcceptMorePlanktons(Plankton[] storage planktons, uint inactivePlanktons, uint maxPlanktonsAllowed) internal view returns (bool) {
    uint totalActivePlanktons = planktons.length - inactivePlanktons;
    return totalActivePlanktons < maxPlanktonsAllowed;
  }

  function canAcceptMoreZooxes(Zoox[] storage zooxes, uint inactiveZooxes, uint maxZooxesAllowed) internal view returns (bool) {
    uint totalActiveZooxes = zooxes.length - inactiveZooxes;
    return totalActiveZooxes < maxZooxesAllowed;
  }

  function totalContributions(Contribution[] storage contributions) internal view returns (uint) {
    uint totalContributed;
    // since maxContributions is chosen carefully, DoS attacks can be prevented
    for(uint i = 0; i < contributions.length; i++) 
    {
      Contribution memory contribution = contributions[i];
      totalContributed += contribution.amount;
    }
    return totalContributed;
  }
}