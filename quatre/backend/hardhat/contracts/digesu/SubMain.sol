// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "./interfaces/IDigesu.sol";
import "./libs/Utils.sol";
import "./peripherals/FuncHandler.sol";
import "./account/AccountManager.sol";
import "./peripherals/Currency.sol";

/**
  ERROR CODE
  ==========
  1. Amount exists
  2. Not an Owner
  3. Insufficient balance
  4. Out of bound.
  5. Pool is filled.
  6. Function locked.
  7. User not a member in this band.
  8. Value less than expected.
  9. Invalid pool id.
  10. User already getFinance.
  11. User is yet to default payment.
  12. Address is empty.
  13. Invalid positioning.
  14. Anomally detected: User not paid;
  15. Cannot cancel at this time. Pool already more than 1.
  16. All members yet to GetFinance.
  17. Cannot have admin in multiple places.
  18. User cannot replicate in a band.
  19. Invalid input.
  20. Operation failed.
 */

abstract contract SubMain is IDigesu, AccountManager, Currency, FuncHandler, Pausable {
  using Utils for *;

  // Public state variables;
  PublicData public pcd;

  //Group data
  Pool[] private pools;

  /**
  @dev Tracks unit contribution.
    @notice User cannot launch a pool with amount 
              already active until such band is filled or cancelled. 
  */
  mapping(uint256 => bool) public amountExist;

  modifier validateId(uint poolId) {
    bool(poolId < pools.length).assertUnchained("9");
    _;
  }
  
  // Only when user is a member.
  modifier memberStatus(uint poolId, address who, bool value, Mode mode) {
    _assertIsMember(poolId, who, value);
    _;
  }

  // modifier validateQuorum(uint8 quorum) {
  //   bool(quorum > 0).assertChained2(quorum <= type(uint8).max, "9");
  //   _;
  // }

  modifier validatePrice(uint price) {
    bool(price > 0).assertUnchained("8");
    _;
  }

  modifier validateList(address[] memory members, Mode mode) {
    if(mode == Mode.STRICT) {
      require(members.length > 1, "19");
    }
    require(members[0] ==_msgSender(), "19");
    _;
  }

  constructor(address _token, address feeTo) {
    pcd.token = _token;
    pcd.feeTo = feeTo;
  }

  ///@dev Checks if @param who { caller } belongs to pool poolId
  function _assertIsMember(uint poolId, address who, bool value) internal view {
    uint pos = _fetchPosition(poolId, who);
    bool isMember = pools[poolId].mems[pos] == who;
    bool(isMember == value).assertUnchained("7");
  }

  /**@dev Returns tracker Id
          @param poolId - Group index.
   */
  function _getTracker(uint poolId) internal view returns (uint8 _return) {
    _return = uint8(pools[poolId].mems.length);
  }

  ///@dev Returns all uint256s related data in pool at poolId.
  function _fetchPoolData(uint poolId) internal view returns (Pool memory _return) {
    _return = pools[poolId];
  }

  // Get the token ptice
  function _getQFTPriceInETH() internal pure returns (uint _price) {
    _price = 1e15 wei; // ================================================> We use oracle here
  }

  ///@dev Returns total pool
  function _getPools() public view returns (Pool[] memory _pool) {
    _pool = pools;
    return _pool;
  }

  ///@dev Generates new Id for new pool
  function _generateGroupIndex() internal view returns (uint _return) {
    _return = uint(pools.length);
  }

  //@dev Adds new member
  function _addNewMember(uint poolId, address who) private returns( uint position) {
    // tracker = _getTracker(poolId);
    position = pools[poolId].mems.length;
    pools[poolId].mems.push(who);
    // if(who == _account(_msgSender())) pools[poolId].uints.tracker ++;
  }

  function _createPool(P1 memory p1, Mode mode, uint poolId) private {
    bool(p1.duration > 0).assertChained3(p1.members.length > 0, p1.duration < type(uint8).max, "4");
    pools.push();
    pools[poolId].uints = Uints(mode, p1.quorum, 0, p1.ccr, p1.duration * 1 days);
    pools[poolId].uint256s =  Uint256s(p1.value, 0, p1.value);
    pools[poolId].addrs = Addresses(p1.asset, address(0));
    _unlock(poolId, FuncTag.ADD);
  }

  /**@dev Launches a new public band
      @param p1 : Encapsulates parameters required by this function.
    Note: We explicitly added the band creator to 2nd position.
   */
  function _createPublicPool(P1 memory p1)
    internal
    checkIfAccountExist(_msgSender(), false) 
    validateList(p1.members, Mode.NONSTRICT)
    onlySupportedToken(p1.asset) returns (uint poolId)
  {
    address alc = _account(p1.members[0]);
    amountExist[p1.value].assertNotUnchained("1");
    _screenBalance(p1.asset, alc, p1.value);
    poolId = _generateGroupIndex();
    bool(p1.duration > 0).assertChained2(p1.duration < type(uint16).max, "4");
    _createPool(p1, Mode(0), poolId);
    _initializeAccount(alc, p1.asset, address(0), true, poolId, true, true, p1.value);
    
  }

  /**@dev Launches a new private band
      @param p1 : Encapsulates parameters required by this function.
      Note: Caller must correspond to address at position 2 in the address array.
   */
  function _createPrivatePool(P1 memory p1) 
    internal
    checkIfAccountExist(_msgSender(), false) 
    onlySupportedToken(p1.asset)
    validateList(p1.members, Mode.STRICT)
    returns (uint poolId) 
  {
    _screenBalance(p1.asset, _account(_msgSender()), p1.value);
    poolId = _generateGroupIndex();
    _createPool(p1, Mode(1), poolId);

    for (uint i = 0; i < p1.members.length; i++) {
      bool isAdmin = true;
      bool reduce = false;
      uint value = p1.value;
      address alc = _account(p1.members[i]);
      bool(alc != address(0)).assertUnchained("17");
      if(i > 0) {
        isAdmin = false;
        _check(false, alc);
        value = 0;
        bool(alc != _account(_msgSender())).assertUnchained("17");
      }
      _initializeAccount(alc, p1.asset, address(0), true, poolId, isAdmin, reduce, value);
    }
  }

  function _initializeAccount(
    address alc, 
    address token,
    address transferTo,
    bool lock, 
    uint poolId, 
    bool isAdmin,
    bool reduce,
    uint value
  ) private {
    poolId.safeInitializeInfo(
      Info(_addNewMember(poolId, alc), 0, 0, 0, 0, 0, isAdmin, true, false), 
      lock,
      reduce,
      IAccount(alc),
      value,
      token,
      transferTo
    );
  }

  function _screenBalance(address token, address alc, uint value) private view {
    (, uint _engaged, uint _mostRecent) = IAccount(alc).getSpendableBalance(token);
    require(_mostRecent > _engaged &&  (_mostRecent - _engaged) >= value , "3");
  }

  /**@dev
    Internal: Instantiates a new band.
   */
  function _joinABand(uint poolId) 
    internal
    validateId(poolId)
    checkIfAccountExist(_msgSender(), false)
    memberStatus(poolId, _account(_msgSender()), false, _getMode(poolId))
    returns (Pool memory _pool, address alc) 
  {
    Pool memory pool = _fetchPoolData(poolId);
    alc = _account(_msgSender());
    _screenBalance(pool.addrs.asset, alc, pool.uint256s.unit);
    bool(pool.mems.length < pool.uints.quorum).assertUnchained("5");
    
    if (pool.uints.mode == Mode.STRICT) {
      bool(pool.mems[_fetchPosition(poolId, alc)] == alc).assertUnchained("7");
    }
    _initializeAccount(
      alc,
      pool.addrs.asset,
      pool.mems[0],
      false,
      poolId,
      false,
      false, // 'reduce' is really immeterial here
      pool.uint256s.unit
    );
    require(IAccount(pool.mems[0]).updateBalancesInUse(pool.addrs.asset, pool.uint256s.unit, true), "Sub: Failed");

    pools[poolId].uint256s.currentPool += pool.uint256s.unit;
    _pool = _fetchPoolData(poolId);
  }

  function _getMode(uint poolId) internal view returns(Mode mode) {
    mode = _fetchPoolData(poolId).uints.mode;
  }

   ///@dev Returns current timestamp (unix).
  function _now() internal view returns (uint) {
    return block.timestamp;
  }

  function _fetchPosition(uint poolId, address alc) internal view returns(uint pos) {
    pos = IAccount(alc).getSubscriptionInfo(poolId).position;
  } 

  ///@dev Modifies member's information 
  function _updateMemberData(UpdateParam memory upr) 
    private 
    returns (address valueTo, uint position) 
  {
    pools[upr.poolId].uint256s.currentPool = 0;
    // address _actual = _account(_msgSender());
    valueTo = upr.expected;
    
    Info memory exp = IAccount(valueTo).getSubscriptionInfo(upr.poolId);
    position = exp.position;
    if (_account(_msgSender()) != upr.expected) {
      if (_now() > exp.turnTime + 1 hours) {
        _assertIsMember(upr.poolId, _account(_msgSender()), true);
        valueTo = _account(_msgSender());
        exp = _swapPosition(valueTo, upr.pool.addrs.asset, upr.poolId, exp, valueTo);
        position = exp.position;
      }
    }
    bool reduce;
    uint val = upr.pool.uint256s.currentPool;

    if(valueTo == upr.pool.mems[0]) {
      reduce = true;
    } else {
      val = upr.owings + upr.makerFee;
      upr.pool.addrs.asset.safeWithdrawRouterOnly(
        IAccount(upr.pool.addrs.lastPaid),
        valueTo, 
        pcd.feeTo, 
        upr.pool.uint256s.currentPool, 
        upr.makerFee
      );
    }

    upr.poolId.safeInitializeInfo(
        Info(exp.position, _now() + upr.pool.uints.duration, 0, upr.owings, 0, upr.colBals, exp.isAdmin, true, true),
        true,
        reduce,
        IAccount(valueTo),
        val,
        upr.pool.addrs.asset,
        address(0)
      );
    
    pools[upr.poolId].uints.selector ++;
  }

  function _swapPosition(
    address actual,
    address asset,
    uint poolId,
    Info memory expected,
    address valueTo
  ) private 
    returns(Info memory _expected) 
  {
    Info memory act = IAccount(actual).getSubscriptionInfo(poolId);
    uint posActual = act.position;
    act.position = expected.position;
    expected.position = posActual;
    _expected = act;
    
    require(
      IAccount(valueTo).initializeInfo(
        expected, 
        true,
        false,
        poolId, 
        0, 
        asset,
        address(0)
      ), 
    "20"
    );
  }

  /**
    @dev Penalizes an user for late repayment
          @notice Defaulter is surcharged.
                  Penalty is credited to the account of next member to GH.
   */
  function _computePenalty(uint poolId, address user) internal view returns (uint256) {
    if (pcd.penFee == 0) return 0;

    return Utils.mulDivOp(IAccount(user).getSubscriptionInfo(poolId).colBals, pcd.penFee);
  }

  /**@dev Can update the penalty rate. Should be restricted to the owner or authorized admin. */
  function updatePenFee(uint8 newRate) public virtual {
    require(newRate <= type(uint8).max, "Invalid rate");
    pcd.penFee = newRate;
  }



  /**Utility to get finance
    @param poolId : Pool id or locator
   */
  function _getFinance(uint poolId) 
    internal
    validateId(poolId)
    checkIfAccountExist(_msgSender(), false) 
    memberStatus(poolId, _account(_msgSender()), true, _getMode(poolId))
    returns(address valueTo, uint position)
  {
    _lock(poolId, FuncTag.GET);
    Pool memory pool = _fetchPoolData(poolId);
    if(pool.allGh == pool.uints.quorum) revert AllMemberIsPaid();
    bool(pool.uint256s.currentPool >= ( pool.uint256s.unit * pool.uints.quorum)).assertUnchained("4");
    (uint mFee, uint owings) = Utils.computeMakerFee(CMF(pool.uint256s.currentPool, pcd.makerFee));
    (valueTo, position) = _updateMemberData(UpdateParam(
        pool.mems[pool.uints.selector], 
        poolId,
        owings,
        mFee,
        Utils.computeCollateral(
          CC(
              pcd.token, 
              _account(_msgSender()), 
              pool.uints.ccr, 
              _getQFTPriceInETH(), 
              pool.uint256s.currentPool
            )
          ),
        pool
      )
    );
    pools[poolId].allGh ++;
  }

  ///@dev Returns info if current beneficiary has defaulted otherwise an empty struct is returned.
  function _enquireLiquidation(uint poolId) internal view validateId(poolId) returns (Liquidation memory) {
    Pool memory _p = _fetchPoolData(poolId);
    Info memory info = IAccount(_p.addrs.lastPaid).getSubscriptionInfo(poolId);
    return _now() > info.payDate ? Liquidation(
      info.position, 
      _p.addrs.lastPaid,
      info.payDate,
      info.owings, 
      info.colBals
    ) : Liquidation(0, address(0), 0, 0, 0);
  }


  /**
    @dev Liquidates defaulter.
          - If the current beneficiary defaults, they're liquidated.
          - Their collateral balances is forwarded to the liquidator.

  */
  function _liquidate(uint poolId, address who) 
    internal 
    checkIfAccountExist(_msgSender(), false)
    returns (address _liq, uint amount)
  {
    Liquidation memory liq = _enquireLiquidation(poolId);
    address alc_who = _account(who);
    _liq = liq.who;

    Info memory info_liq = IAccount(_liq).getSubscriptionInfo(poolId);
    if(_liq == address(0)) revert("11");
    address token = _fetchPoolData(poolId).addrs.asset;
    _screenBalance(token, alc_who, liq.debt);
    amount = poolId;
    info_liq.owings = 0;
    require(IAccount(_liq).clearSubscription(poolId), "20");
    amount.safeInitializeInfo(
        info_liq,
        true, // Locks the value in user's wallet until we need to move to the next person
        true, 
        IAccount(alc_who),
        liq.debt,
        token,
        address(0)
    );

    pools[poolId].addrs.lastPaid = alc_who;
    amount = info_liq.owings;
    Utils.moveCollateral(pcd.token, alc_who, _liq, info_liq.colBals);
  }

  /**
    @dev Cancels recent unfil band.
      Only admin of a band can cancel only if no one has join the band.
  */
  function _cancelBand(uint poolId) 
    internal
    validateId(poolId)
    checkIfAccountExist(_msgSender(), false)
    memberStatus(poolId, _account(_msgSender()), true, _getMode(poolId))
  {
    Pool memory _p = _fetchPoolData(poolId);
    address alc = _account(_msgSender());
    // uint8 quorum = uint8(pools[poolId].uints.quorum);
    if(_p.uints.mode == Mode.NONSTRICT) {
      bool(_p.mems.length == 1).assertUnchained("15");
      delete amountExist[_p.uint256s.unit];
    }
    if(_p.uints.mode == Mode.STRICT) bool(_p.uint256s.currentPool == _p.uint256s.unit).assertUnchained("15");
    _p.addrs.asset.safeUpdateBalancesInUse(
      IAccount(alc),
      _p.uint256s.unit, 
      true
    );

    emit Cancellation(poolId, _p.uint256s.unit, alc);
  }

  /**@dev Payback borrowed fund.
      Note: We are only concerned about who is to pay back and not 
              who is paying back. Ordianrily, any of the members can pay 
              on behalf of another.
  */
  function _payback(uint poolId) 
    internal
    validateId(poolId)
    checkIfAccountExist(_msgSender(), false)
    memberStatus(poolId, _account(_msgSender()), true, _getMode(poolId))
    returns(GCB memory _return, address alc) 
  {
    Pool memory _p = _fetchPoolData(poolId);
    Info memory _info = IAccount(_account(_msgSender())).getSubscriptionInfo(poolId);
    (, uint _engaged, uint _mostRecent) = IAccount(_account(_msgSender())).getSpendableBalance(_p.addrs.asset);
    bool(_info.owings > 0).assertChained2((_mostRecent - _engaged) >= _info.owings, "5"); // <=====

    _return = GCB(
      _p.addrs.asset, 
      _account(_msgSender()), 
      address(0), 
      _info.colBals,
      0,
      CR(0, 0),
      CR2(_info.payDate, _p.uint256s.unit)
    );

    _info.turnTime = 0;
    _info.owings = 0;
    _info.payDate = 0;
    if(_p.allGh == _p.uints.quorum) {
      _lock(poolId, FuncTag.PAYBACK);
      _unlock(poolId, FuncTag.COMPLETE);
    }
    uint _poolId = poolId;
    alc = _account(_msgSender());
    _poolId.safeInitializeInfo(
      _info,
      true, // Locks the value in user's wallet until we need to move to the next person
      true, 
      IAccount(_account(_msgSender())),
      _info.owings,
      _p.addrs.asset,
      address(0)
    );

  }

  /**
    Completes the current round.
    - Only member of the band can call.
  */
  function _roundUp(uint poolId, address who) 
    internal
    validateId(poolId)
    checkIfAccountExist(_msgSender(), false)
    memberStatus(poolId, _account(who), true, _getMode(poolId))
  {
   
    Pool memory pool = _fetchPoolData(poolId);
    bool(pool.allGh == pool.uints.quorum).assertUnchained("16");
    address lastPaid = pool.addrs.lastPaid;
    if(pool.uints.mode == Mode.NONSTRICT) delete amountExist[pools[poolId].uint256s.unit];
    uint _poolId = poolId;
    _poolId.safeSplit(
        IAccount(lastPaid),
        pool.addrs.asset,
        pool.mems,
        pcd.feeTo,
        pool.uint256s.unit, 
        IAccount(lastPaid).getSubscriptionInfo(_poolId).owings
    );

    emit RoundUp(_poolId, pool);
  }

  function updatePublicData(
    address feeTo,
    address token,
    uint8 penFee,
    uint8 makerFee
  ) public virtual {
    if(feeTo == address(0)) revert ZeroAddress(feeTo);
    if(token == address(0)) revert ZeroAddress(token);
    bool(penFee < type(uint8).max).assertChained2(makerFee < type(uint8).max, "19");
    pcd = PublicData(feeTo, token, penFee, makerFee);
  }

}