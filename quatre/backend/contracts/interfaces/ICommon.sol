// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICommon {
  event BandCreated (uint96 poolId, uint8 quorum, uint amount, TokenSelector currency, Mode mode);
  event Joined(uint96 poolId, address who, uint amount);
  event GetFinanced(uint96 poolId, uint8 position);

  error InSufficientValue();
  error InsufficientFund();
  error InvalidParameter();
  error SystemNotRunning();
  error SystemAlreadyRunning();
  error UnsupportedAsset();
  error NoSystemDetected();

  // #Enums
  enum FunTag { ADD, GET, PAYBACK, COMPLETE }
  enum Currency { NATIVE, ERC20 }
  enum Status { LOCKED, OPEN }
  enum Mode { NONSTRICT, STRICT }

  //structs
  struct Member {
    Get get;
    Post post;
  }

  struct Pool {
    Uints uints;
    Uint256s uint256s;
    Addresses addrs;
    Member[50] mems;
    uint8 allGh;
  }

  struct Param2 {
    uint96 pid;
    uint256 value;
    address newUser;
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
    uint8 tracker;
    uint16 ccr; // colCoverageRatio
    uint32 duration;
  }
  
  struct Addresses {
    address creator;
    address trustee;
    address currentPaid;
  }

  struct Get {
    uint32 erp;
    uint32 turnTime;
    uint256 colBals;
    uint256 owings;
  }

  struct Post {
    bool hasGH;
    address addr;
  }

  struct MemData {
    uint8 expPos;
    uint8 actPos;
    uint96 pid;
    uint owings;
    address who;
    uint ret1;
    Member expected;
    Member actual;
  }

  struct Param {
    address from;
    address to;
    uint amount;
    uint amountTo;
    uint mintable;
  }

  struct Param1 {
    address to;
    address from;
    uint amount;
  }

  struct Param2 {
    address token;
    address feeTo;
    address busd;
    address usdt;
  }

  struct Member {
    bool isMember;
  }

  struct Info {
    // uint8 position;
    uint32 expectedRepaymentDate;
    uint32 turnTime;
    uint256 owings;
    uint256 reward;
    uint256 share;
    // Currency inuse;
    bool isAdmin;
    bool isMember;
    address system;
  }
}