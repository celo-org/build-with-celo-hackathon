// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

/**
  Interface: constant typed data.
  Used only for initialization and grouping of parameters.
  - Easily share data amongst functions and contracts.
 */
 
interface Params {

  /**
  @dev Structured data types to easily work with
      data and parameters.  
   */
  struct Param_Create {
    uint8 quorum;
    uint8 duration;
    uint16 ccr;
    uint256 value;
    address[] members;
    // address msgSender;
    uint tokenPriceInETH;
  }

  // struct PaybackParam {
  //   address token, 
  //   address sender, 
  //   address to, 
  //   uint amount, 
  //   uint amountTo,
  //   uint32 payDate,
  //   uint valueContributed
  // }

  // struct MC {
  //   address token;
  //   address to;
  //   address from;
  //   uint256 amount;
  // }

  // struct CC {
  //   address token;
  //   address who;
  //   uint16 expectedCcr;
  //   uint assetPriceInETH;
  //   uint loanValueInETH;
  // }

  // struct Return1 {
  //   uint collateralBalanceInETH;
  //   uint collateralBalanceInToken;
  //   uint actualCollateralCoverageRatio;
  // }

  // struct Add {
  //   uint8 by;
  //   uint64 pid;
  //   address who;
  // }

  // struct ReturnParam {
  //   address trustee;
  //   uint8 quorum;
  //   uint8 tracker;
  // }

  // struct Liquidation {
  //   uint8 index;
  //   address who;
  //   uint32 expectedRepaymentTime;
  //   uint256 debt;
  //   uint256 colBalInToken;
  // }

  // struct LiqParam {
  //   uint64 pid;
  //   uint256 msgValue;
  //   address msgSender;
  // }

  // struct CMF {
  //   uint amount;
  //   uint16 makerRate;
  // }

  // struct TrusteeParams {
  //   address selectedToken;
  // }

}