// SPDX-License-Identifier: Apache 2.0
pragma solidity ^0.8.7;

// Importing OpenZeppelin's SafeMath Implementation
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import 'hardhat/console.sol';

import './Rosca.sol';

contract Spaces {
  using SafeMath for uint256;
  using SafeMath for uint256;

  struct ActiveSpace {
    address spaceAddress;
    string spaceType; // rosca, personal, regular, mchango,
  }

  //List of all spaces
  Rosca[] public roscas;
  mapping(address => ActiveSpace[]) mySpaces;
  mapping(address => mapping(address => uint256)) mySpaceIdx; //starts from 1, 0 means was removed

  //event for when a new rosca is created
  event CreatedRosca(address roscaAddress, address roscaCreator, RoscaDetails RD);

  function createRosca(RoscaDetails memory rD) external {
    Rosca newRosca = new Rosca(payable(msg.sender), rD);

    roscas.push(newRosca);
    ActiveSpace memory AS;
    AS.spaceAddress = address(newRosca);
    AS.spaceType = 'rosca';
    mySpaces[msg.sender].push(AS); //update spaces list
    mySpaceIdx[msg.sender][address(newRosca)] = mySpaces[msg.sender].length;

    emit CreatedRosca(address(newRosca), msg.sender, rD);
  }

  function returnSpaces() external view returns (Rosca[] memory) {
    return roscas;
  }

  //get myspaces
  function getMySpaces() external view returns (ActiveSpace[] memory) {
    return mySpaces[msg.sender];
  }
}
