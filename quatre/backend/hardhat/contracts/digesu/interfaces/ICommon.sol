// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

interface ICommon {
  event GetFinanced(uint, uint, address);
  event AccountLaunched(address indexed, address indexed);
  event Payback(uint, uint, address indexed);
  event NewAccount( address indexed,  address indexed, uint);

  event Joined(uint, address, uint);
  event BandCreated (uint, Pool);
  event RoundUp(uint, Pool);
  event Rekeyed(address indexed, address indexed);

  error AllMemberIsPaid();
  error InvalidParameter();
  error SystemNotRunning();
  error ExecutionStopped();
  error UnsupportedToken();
  error InSufficientValue();
  error NoAccountDetected();
  error UnAuthorizedCaller();
  error AccountNotApproved();
  error SomethingWentWrong();
  error ZeroAddress(address);
  error TargetHasNoAccount();
  error WithdrawalRestricted();
  error SystemAlreadyRunning();
  error StatusAlreadyUpdated();
  error InconsistentArrayValue();
  error UnsupportedAsset(address);
  error AccountAlreadyDeactivated();
  error InsufficientFund(uint, uint);
  error IDoNotAcceptEtherIFYouForceItLost();

  // #Enums
  enum Mode { NONSTRICT, STRICT }
  
  // Balances types
  enum Balances { WITHDAWABLE, INUSE }

    // error NonInContext();
  enum FuncTag { ADD, GET, PAYBACK, COMPLETE }

  enum Access { DENIED, ALLOWED }

  struct Pool {
    Uints uints;
    Uint256s uint256s;
    Addresses addrs;
    address[] mems;
    uint allGh;
  }

  struct Param2 {
    uint pid;
    uint value;
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
    uint expectedCcr;
    uint assetPriceInETH;
    uint loanValueInETH;
  }

  struct Param3 {
    address gh;
    uint8 position;
    uint poolId;
    uint256 owings;
    uint256 colBal;
  }
  
  struct Uint256s {
    uint unit;
    uint receivable;
    uint currentPool;
  }

  struct Uints {
    Mode mode;
    uint quorum;
    uint selector;
    uint ccr; // colCoverageRatio
    uint duration;
  }
  
  struct Addresses {
    address asset;
    address lastPaid;
  }
  
  struct CR {
    uint totalValueContributed;
    uint subscribers;
  }

  struct CR2 {
    uint erd; 
    uint valueContributed;
  }

    /**
  @dev Structured data types to easily work with
      data and parameters.  
   */
  struct P1 {
    uint quorum;
    uint duration;
    uint ccr;
    uint value;
    address[] members;
    address asset;
  }

  struct GCB {
    address token;
    address who;
    address to;
    uint amount;
    uint amountTo;
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
    uint by;
    uint pid;
    address who;
  }

  struct Return2 {
    address trustee;
    uint quorum;
    uint tracker;
  }

  struct Liquidation {
    uint index;
    address who;
    uint expectedRepaymentTime;
    uint debt;
    uint colBalInToken;
  }

  // struct LiqParam {
  //   uint64 pid;
  //   address msgSender;
  // }

  struct CMF {
    uint amount;
    uint16 makerRate;
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

  struct UpdateParam {
    address expected; 
    uint poolId; 
    uint owings;
    uint makerFee;
    uint colBals;
    Pool pool;
  }

  struct CreateParam {
    uint poolId;
    function (uint, FuncTag) internal _lock;
    function (address) internal view returns(address) _account;
    function () internal returns(uint) _getQFTPriceInETH;
  }

  struct Accounts {
    address active;
    address deactivated;
  }

}