// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "./ICommon.sol";

interface IAccount is ICommon {
  function rekey(address) external returns(bool);
  function depositERC20Token(address, uint) external returns(bool);
  function withdrawRouterOnly(address, address, address, uint, uint) external returns(bool);
  function getSubscriptionInfo(uint) external view returns(Info memory);  
  function updateBalancesInUse(address, uint, bool) external returns(bool);
  function getSpendableBalance(address) external view returns(uint, uint, uint);
  function initializeInfo(Info memory, bool,bool,uint,uint,address,address) external returns(bool);
  function updateTurnTime(uint) external returns(bool);
  function clearSubscription(uint) external returns(bool);
  function setStatus(uint, bool, bool) external returns(bool);
  function split(uint,address ,address[] memory,address,uint, uint) external returns(bool);
}
