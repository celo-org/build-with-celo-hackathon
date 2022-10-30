// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICommon {
  event BandCreated (uint96 poolId, uint8 quorum, uint amount, Mode mode);
  event AccountLaunched(address newAlc, address indexed sender);
  event Joined(uint96 poolId, address who, uint amount);
  event GetFinanced(uint96 poolId, uint8 position);
  event Payback(uint96 poolId, uint amount);

  error AllMemberIsPaid();
  error InvalidParameter();
  error SystemNotRunning();
  error UnsupportedToken();
  error InSufficientValue();
  error NoAccountDetected();
  error UnAuthorizedCaller();
  error SystemAlreadyRunning();
  error WithdrawalRestricted();
  error InconsistentArrayValue();
  error ZeroAddress(address token);
  error UnsupportedAsset(address asset);
  error InsufficientFund(uint actual, uint expected);

  // #Enums
  enum Status { LOCKED, OPEN }
  enum Mode { NONSTRICT, STRICT }

  struct Pool {
    Uints uints;
    Uint256s uint256s;
    Addresses addrs;
    address[] mems;
    uint8 allGh;
  }

  struct Param2 {
    uint96 pid;
    uint256 value;
    address newUser;
  }

  struct Param {
    address from;
    address to;
    uint amount;
    uint amountTo;
    uint mintable;
  }

  struct CC {
    address token;
    address who;
    uint16 expectedCcr;
    uint assetPriceInETH;
    uint loanValueInETH;
  }

  struct Param3 {
    address gh;
    uint8 position;
    uint96 poolId;
    uint256 owings;
    uint256 colBal;
  }
  
  struct Uint256s {
    uint256 unit;
    uint256 receivable;
    uint256 currentPool;
    uint256 tokenPrice;
  }

  struct Uints {
    Mode mode;
    uint8 quorum;
    uint8 selector;
    uint16 ccr; // colCoverageRatio
    uint32 duration;
  }
  
  struct Addresses {
    address asset;
    address lastPaid;
  }
  
  struct CR {
    uint totalValueContributed;
    uint96 subscribers;
  }

  struct CR2 {
    uint8 erd; 
    uint valueContributed;
  }

  struct Member {
    bool isMember;
  }

    /**
  @dev Structured data types to easily work with
      data and parameters.  
   */
  struct P1 {
    uint8 quorum;
    uint8 duration;
    uint16 ccr;
    uint256 value;
    address trustee;
    address[] members;
    address msgSender;
    uint tokenPriceInETH;
  }

  struct GCB {
    address token;
    address who;
    address to;
    uint256 amount;
    uint256 amountTo;
    CR cr;
    CR2 cr2;
  }

  struct MC {
    address token;
    address to;
    address from;
    uint256 amount;
  }

  struct Return1 {
    uint collateralBalanceInETH;
    uint collateralBalanceInToken;
    uint actualCollateralCoverageRatio;
  }

  struct Add {
    uint8 by;
    // bool hasRemitted;
    uint64 pid;
    address who;
  }

  struct Return2 {
    address trustee;
    uint8 quorum;
    uint8 tracker;
  }

  struct Liquidation {
    uint8 index;
    address who;
    uint32 expectedRepaymentTime;
    uint256 debt;
    uint256 colBalInToken;
  }

  struct LiqParam {
    uint64 pid;
    uint256 msgValue;
    address msgSender;
  }

  struct CMF {
    uint amount;
    uint16 makerRate;
  }

  struct TrusteeParams {
    address selectedToken;
  }
  
  struct Param1 {
    address to;
    address from;
    uint amount;
  }

  struct Info {
    uint position;
    uint payDate;
    uint turnTime;
    uint owings;
    uint reward;
    uint colBals;
    bool isAdmin;
    bool isMember;
    bool hasGH;
  }

}