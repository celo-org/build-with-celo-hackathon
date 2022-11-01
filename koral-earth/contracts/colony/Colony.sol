// SPDX-License-Identifier: GPLv3
// koral.earth smart contracts

// This smart contract is for demo purposes only
// The protocol is still a WIP and this was made to show basic ideas using a smart contract

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "../shared/access/Administrable.sol";
import "../shared/access/Modifiable.sol";
import "../shared/access/Stoppable.sol";
import "../shared/events/EmitsEvent.sol";
import "../shared/libs/Koral.sol";
import "./Plankton.sol";
import "./Reward.sol";
import "./Zoox.sol";
import "./Contribution.sol";

contract Colony is Administrable, EmitsEvent, Initializable, Modifiable, Stoppable {
  using Koral for Plankton[];
  using Koral for Zoox[];
  using Koral for Contribution[];

  uint public maxPlanktons;
  uint public maxZooxes;
  uint public totalInactivePlanktons;
  uint public totalInactiveZooxes;
  uint public totalInactiveRewards;
  uint public maxInstalmentsPerPlankton;
  string public colonyName;
  
  Plankton[] public _planktons;
  Reward[] public _rewards;
  Zoox[] public _zooxes;

  mapping(uint => bool) public rewardIsActive;
  mapping(address => bool) public zooxIsActive;
  mapping(address => bool) public planktonIsActive;

  mapping(string => uint) public minContributionPerProject;

  mapping(address => uint[]) public _claimed;
  mapping(address => uint[]) public _assigned;

  mapping(string => uint[]) public _projectRewards;
  mapping(string => mapping(uint => bool)) public _activeProjectRewards;
  mapping(address => mapping(string => Contribution[])) public _planktonContributions;


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

  function initialize(string memory _colonyName, uint _maxPlanktons, uint _maxZooxes) public initializer {
    assignNewAdmin(msg.sender);
    colonyName = _colonyName;
    maxPlanktons = _maxPlanktons;
    maxZooxes = _maxZooxes;
    maxInstalmentsPerPlankton = 4; // carefully chosen to avoid DoS attacks
  }

  function launch() public isPolyp {
    makeFinal();
    emitActionSuccess("Colony launched successfully.");
  }

  function addReward(uint minContributionAmount, string memory projectId, string memory name, string memory location) public isModifiable isPolyp {
    _rewards.push(
      Reward(name, location)
    );

    uint rewardId = _rewards.length - 1;

    minContributionPerProject[projectId] = minContributionAmount;

    _projectRewards[projectId].push(rewardId);
    _activeProjectRewards[projectId][rewardId] = true;

    rewardIsActive[rewardId] = true;

    emitActionSuccess("Reward added successfully.");
  }

  function deactivateReward(uint rewardId) public isModifiable isPolyp {
    require(rewardIsActive[rewardId], "Colony: reward deactivation failed since reward is inactive.");

    rewardIsActive[rewardId] = false;
    
    totalInactiveRewards++;

    emitActionSuccess("Reward deactivated successfully.");
  }

  function contributeToOffset(string memory projectId) public payable stopInEmergency {
    require(
      _planktonContributions[msg.sender][projectId].length < maxInstalmentsPerPlankton, 
      "Colony: Max contributions exceeded for this project."
    );

    _planktonContributions[msg.sender][projectId].push(
      Contribution(msg.value, projectId)
    );

    emitActionSuccess("Offset contribution accepted.");
  }

  function claimReward(uint rewardId, string memory projectId) public isActivePlankton isValidReward(rewardId) {
    require(rewardIsActive[rewardId], "Colony: Reward is no longer claimable.");
    require(_activeProjectRewards[projectId][rewardId], "Colony: Reward not associated with project."); 
    require(
      minContributionPerProject[projectId] <= _planktonContributions[msg.sender][projectId].totalContributions(), 
      "Colony: insufficient contribution."
    );

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
      Zoox(zoox)
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
      Plankton(plankton)
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

  function setColonyName(string memory _colonyName) public isModifiable isPolyp {
    colonyName = _colonyName;
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

  function rewards() view public returns (Reward[] memory) {
    return _rewards;
  }

  function projectRewards(string memory projectId) view public returns (uint[] memory) {
    return _projectRewards[projectId];
  }

  function zooxes() view public returns (Zoox[] memory) {
    return _zooxes;
  }

  function planktons() view public returns (Plankton[] memory) {
    return _planktons;
  }

  function claimed() view public isActivePlankton returns (uint[] memory) {
    return _claimed[msg.sender];
  }

  function assigned() view public isActivePlankton returns (uint[] memory) {
    return _assigned[msg.sender];
  }
}