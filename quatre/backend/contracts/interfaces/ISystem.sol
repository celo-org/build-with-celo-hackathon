// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Common.sol";

interface ISystem is Common {
  error UnAuthorizedCaller();
  error InsufficientFund();
  error WithdrawalRestricted();
  error UnsupportedToken();

  function updateStatus(uint96 poolId) external returns(bool);

  function setCurrency(Currency touse) external returns (bool);
  function depositNative() external payable;
  function depositERC20Token(address erc20Address, uint amount) external;
  function withdrawNative(uint amount, address to) external;
  function getSubscrpitionInfo(uint128 poolId) external view returns(Info memory);  
  function updatedWithdrawAllowance(CanWithdraw signal, bool value) external;
  
  
  // function initializeLeaveData(Info memory info, uint128 poolId) external;
  // function withdrawERC20(address erc20Address, address to, uint amount) external;


  // struct 
}
