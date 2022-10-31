// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "./ICommon.sol";

interface IAccount is ICommon {
  function depositERC20Token(address erc20Address, uint amount) external returns(bool);
  function withdrawRouterOnly(address token, address to, address feeTo, uint amount, uint fee) external returns(bool);
  function getSubscriptionInfo(uint poolId) external view returns(Info memory);  
  function updateBalancesInUse(address asset, uint value, bool reduce) external returns(bool);
  function getSpendableBalance(address token) external view returns(uint, uint, uint);
  function initializeInfo(
    Info memory info, 
    bool lock,
    bool reduceBalance,
    uint poolId,
    uint value,
    address asset,
    address to
  ) external returns(bool);
  
  function updateTurnTime(uint poolId) external returns(bool);
  function clearSubscription(uint poolId) external returns(bool);
  function setStatus(uint poolId, bool isAdmin, bool isMember) external returns(bool);
  function split(
    uint poolId,
    address asset,
    address[] memory members,
    address closeTo,
    uint unitAmount, 
    uint _balance
  ) external returns(bool);
}
