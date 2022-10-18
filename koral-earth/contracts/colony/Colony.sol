// SPDX-License-Identifier: GPLv3
// koral.earth smart contracts

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

  mapping(uint => bool) zooxIsActive;
  mapping(uint => bool) planktonIsActive;
  mapping(uint => bool) rewardIsActive;

  mapping(uint => Koral.Reward) public claimed;
  mapping(uint => Koral.Reward) public assigned;

  modifier isPolyp {
    require(isAdmin(), "Colony: Only the polyp can perform this action."); _;
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

  function addZoox(address zoox) public isModifiable isPolyp {
    require(_zooxes.canAcceptMoreZooxes(totalInactiveZooxes, maxZooxes), "Colony: can't add any more zooxes");

    _zooxes.push(
      Koral.Zoox(zoox)
    );

    zooxIsActive[_zooxes.length - 1] = true;
    
    emitActionSuccess("Zoox added successfully.");
  }

  function deactivateZoox(uint zooxId) public isModifiable isPolyp {
    require(zooxIsActive[zooxId], "Colony: reward deactivation failed since zoox is inactive.");

    zooxIsActive[zooxId] = false;
    totalInactiveZooxes++;

    emitActionSuccess("Zoox deactivated successfully.");
  }

  function addPlankton(address plankton) public isModifiable isPolyp {
    require(_planktons.canAcceptMorePlanktons(totalInactivePlanktons, maxPlanktons), "Colony: can't add any more planktons");

    _planktons.push(
      Koral.Plankton(plankton)
    );

    planktonIsActive[_planktons.length - 1] = true;

    emitActionSuccess("Plankton added successfully.");
  }

  function deactivatePlankton(uint planktonId) public isModifiable isPolyp {
    require(planktonIsActive[planktonId], "Colony: reward deactivation failed since plankton is inactive.");

    planktonIsActive[planktonId] = false;
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
}