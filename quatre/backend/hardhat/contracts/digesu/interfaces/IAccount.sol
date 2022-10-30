// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ICommon.sol";

interface IAccount is ICommon {
  enum Balances { WITHDAWABLE, INUSE }

  // function setStatus( bool isRouter, bool isMember) external returns(bool);
  // function setCurrency(Currency touse) external returns (bool);
  function depositNative() external payable;
  function depositERC20Token(address erc20Address, uint amount) external returns(bool);
  function withdrawRouterOnly(address token, address to, address feeTo, uint amount, uint fee) external returns(bool);
  function withdrawNativeOnlyRouter(uint amount, uint fee, address to, address feeTo) external ;
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
  function clearSubscrition(uint poolId) external returns(bool);
  function setStatus(uint poolId, bool isAdmin, bool isMember) external returns(bool);
}
