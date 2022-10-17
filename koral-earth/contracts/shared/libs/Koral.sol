// SPDX-License-Identifier: GPLv3
// koral.earth smart contracts

pragma solidity ^0.8.0;

library Koral {
  struct Plankton {
    address id;
  }

  struct Zoox {
    address id;
  }
  
  struct Reward {
    string name;
    string location;
  }

  function canAcceptMorePlanktons(Plankton[] storage planktons, uint inactivePlanktons, uint maxPlanktonsAllowed) internal view returns (bool) {
    uint totalActivePlanktons = planktons.length - inactivePlanktons;
    return totalActivePlanktons < maxPlanktonsAllowed;
  }

  function canAcceptMoreZooxes(Zoox[] storage zooxes, uint inactiveZooxes, uint maxZooxesAllowed) internal view returns (bool) {
    uint totalActiveZooxes = zooxes.length - inactiveZooxes;
    return totalActiveZooxes < maxZooxesAllowed;
  }
}