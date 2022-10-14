// SPDX-License-Identifier: GPLv3
// koral.earth smart contracts

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "../shared/access/Administrable.sol";
import "../shared/access/Modifiable.sol";
import "../shared/access/Stoppable.sol";
import "../shared/events/EmitsEvent.sol";

contract Colony is Administrable, EmitsEvent, Initializable, Modifiable, Stoppable {

  struct Plankton {
    address id;
  }

  struct Zoox {
    address id;
  }
  
  struct Reward {
    bool active;
    string name;
    string location;
  }

  uint public maxPlanktons;
  uint public maxZooxes;
  string public name;
  
  Plankton[] public planktons;
  Reward[] public rewards;
  Zoox[] public zooxes;

  mapping(address => Reward) public claimed;
  mapping(address => Reward) public assigned;

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

  function polyp() view public returns (address) {
    return admin;
  }

  function setPolyp(address _polyp) public isModifiable isPolyp  {
    assignNewAdmin(_polyp);
  }

  function setName(string memory _name) public isModifiable isPolyp {
    name = _name;
  }

  function setMaxPlanktons(uint _maxPlanktons) public isModifiable isPolyp {
    maxPlanktons = _maxPlanktons;
  }

  function setMaxZooxes(uint _maxZooxes) public isModifiable isPolyp {
    maxZooxes = _maxZooxes;
  }
}