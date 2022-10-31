// SPDX-License-Identifier: GPLv3
// koral.earth smart contracts

// This smart contract is for demo purposes only
// The protocol is still a WIP and this was made to show basic ideas using a smart contract
// Specifically, this contract intentionally omits the implementation of the 
// rules definition & plankton accomplishment tracker - an essential part of the protocol

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "../shared/access/Administrable.sol";
import "../shared/access/Modifiable.sol";
import "../shared/access/Stoppable.sol";
import "../shared/events/EmitsEvent.sol";
import "../shared/libs/Koral.sol";

contract Colony is Administrable, EmitsEvent, Initializable, Modifiable, Stoppable {
  using Koral for Koral.Plankton[];
  using Koral for Koral.Reward[];
  using Koral for Koral.Zoox[];

  uint public maxPlanktons;
  uint public maxZooxes;
  uint public totalInactivePlanktons;
  uint public totalInactiveZooxes;
  uint public totalInactiveRewards;
  string public name;
  
  Koral.Plankton[] public _planktons;
  Koral.Reward[] public _rewards;
  Koral.Zoox[] public _zooxes;

  mapping(uint => bool) rewardIsActive;
  mapping(address => bool) zooxIsActive;
  mapping(address => bool) planktonIsActive;

  mapping(address => uint[]) public _claimed;
  mapping(address => uint[]) public _assigned;

  modifier isPolyp {
    require(isAdmin(), "Colony: Only the polyp can perform this action."); _;
  }

  modifier isActivePlankton {
    require(planktonIsActive[msg.sender], "Colony: Only active planktons can perform this action."); _;
  }

  modifier isActiveZoox {
    require(zooxIsActive[msg.sender], "Colony: Only active zooxes can perform this action."); _;
  }

  modifier isValidReward(uint rewardId) {
    require(rewardIsActive[rewardId], "Colony: This action can only be performed on an active reward."); _;
  }

  function initialize(string memory _name, uint _maxPlanktons, uint _maxZooxes) public initializer {
    assignNewAdmin(msg.sender);
    name = _name;
    maxPlanktons = _maxPlanktons;
    maxZooxes = _maxZooxes;
  }

  function launch() public isPolyp {
    makeFinal();
    emitActionSuccess("Colony launched successfully.");
  }

  function addReward(string memory _name, string memory _location) public isModifiable isPolyp {
    _rewards.push(
      Koral.Reward(_name, _location)
    );

    rewardIsActive[_rewards.length - 1] = true;

    emitActionSuccess("Reward added successfully.");
  }

  function deactivateReward(uint rewardId) public isModifiable isPolyp {
    require(rewardIsActive[rewardId], "Colony: reward deactivation failed since reward is inactive.");

    rewardIsActive[rewardId] = false;
    totalInactiveRewards++;

    emitActionSuccess("Reward deactivated successfully.");
  }

  function claimReward(uint rewardId) public isActivePlankton isValidReward(rewardId) {
    // NB: For simplicity reasons, rewards are currently deemed to be 
    // claimable and assignable perpetually and simultaneously,
    // In reality, the rules could be different and more explicit. 
    // In such cases, filtering and double spending prevention mechanisms should be implemented.

    _claimed[msg.sender].push(rewardId);
    _assigned[msg.sender].push(rewardId);

    emitActionSuccess("Reward claimed successfully.");
  }

  function addZoox(address zoox) public isModifiable isPolyp {
    require(_zooxes.canAcceptMoreZooxes(totalInactiveZooxes, maxZooxes), "Colony: can't add any more zooxes");

    _zooxes.push(
      Koral.Zoox(zoox)
    );

    zooxIsActive[zoox] = true;
    
    emitActionSuccess("Zoox added successfully.");
  }

  function deactivateZoox(address zoox) public isModifiable isPolyp {
    require(zooxIsActive[zoox], "Colony: reward deactivation failed since zoox is inactive.");

    zooxIsActive[zoox] = false;
    totalInactiveZooxes++;

    emitActionSuccess("Zoox deactivated successfully.");
  }

  function addPlankton(address plankton) public isModifiable isPolyp {
    require(_planktons.canAcceptMorePlanktons(totalInactivePlanktons, maxPlanktons), "Colony: can't add any more planktons");

    _planktons.push(
      Koral.Plankton(plankton)
    );

    planktonIsActive[plankton] = true;

    emitActionSuccess("Plankton added successfully.");
  }

  function deactivatePlankton(address plankton) public isModifiable isPolyp {
    require(planktonIsActive[plankton], "Colony: reward deactivation failed since plankton is inactive.");

    planktonIsActive[plankton] = false;
    totalInactivePlanktons++;

    emitActionSuccess("Plankton deactivated successfully.");
  }

  function setPolyp(address _polyp) public isModifiable isPolyp  {
    assignNewAdmin(_polyp);
  }

  function setName(string memory _name) public isModifiable isPolyp {
    name = _name;
  }

  function setMaxPlanktons(uint _maxPlanktons) public isModifiable isPolyp {
    bool isValidMaxPlantons = _maxPlanktons >= (_planktons.length - totalInactivePlanktons);

    require(isValidMaxPlantons, "Colony: maxPlanktons must not be less than the existing active planktons");

    maxPlanktons = _maxPlanktons;
  }

  function setMaxZooxes(uint _maxZooxes) public isModifiable isPolyp {
    bool isValidMaxZooxes = _maxZooxes >= (_zooxes.length - totalInactiveZooxes);

    require(isValidMaxZooxes, "Colony: maxZooxes must not be less than the existing active zooxes");

    maxZooxes = _maxZooxes;
  }

  function polyp() view public returns (address) {
    return admin;
  }

  function rewards() view public returns (Koral.Reward[] memory) {
    return _rewards;
  }

  function zooxes() view public returns (Koral.Zoox[] memory) {
    return _zooxes;
  }

  function planktons() view public returns (Koral.Plankton[] memory) {
    return _planktons;
  }

  function claimed() view public isActivePlankton returns (uint[] memory) {
    return _claimed[msg.sender];
  }

  function assigned() view public isActivePlankton returns (uint[] memory) {
    return _assigned[msg.sender];
  }
}