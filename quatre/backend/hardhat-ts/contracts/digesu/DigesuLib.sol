// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "./interfaces/IDigesu.sol";
import "./interfaces/ICommon.sol";
import "./libs/Utils.sol";
import "./peripherals/FuncHandler.sol";
import "./account/AccountManager.sol";
import "./peripherals/Currency.sol";
import "./interfaces/IAccountManager.sol";

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

struct Data {
  //Other miscellaneous data. 
  IDigesu.PublicData pcd;

  //Pool container
  ICommon.Pool[] pools;
    /**
  @dev Tracks unit contribution.
    @notice User cannot launch a pool with amount 
              already active until such band is filled or cancelled. 
  */
  mapping(uint256 => bool) amountExist;
}

library DigesuLib {
  using Utils for *;

  ///@dev Checks if @param who { caller } belongs to pool poolId
  function assertIsMember(ICommon.Pool[] storage self, uint poolId, address who, bool value) internal view {
    uint pos = _fetchPosition(poolId, who);
    bool isMember = self[poolId].mems[pos] == who;
    bool(isMember == value).assertUnchained("7");
  }

  /**@dev Returns tracker Id
      @param poolId - Group index.
   */
  function _getTracker(ICommon.Pool[] storage self,  uint poolId) internal view returns (uint8 _return) {
    _return = uint8(self[poolId].mems.length);
  }

  ///@dev Returns all uint256s related data in pool at poolId.
  function _fetchPoolData(ICommon.Pool[] storage self, uint poolId) internal view returns (ICommon.Pool memory _return) {
    _return = self[poolId];
  }

  function _msgSender() internal view returns(address _sender) {
    _sender = msg.sender;
  }

  ///@dev Returns total pool
  function getPools(Data storage self) public view returns (ICommon.Pool[] memory) {
    return self.pools;
  }

  function comparePoolSize(ICommon.Pool[] storage self, uint poolId) internal view {
    bool(poolId < self.length).assertUnchained("9");
  }

  ///@dev Generates new Id for new pool
  function _generateGroupIndex(ICommon.Pool[] storage self) internal view returns (uint _return) {
    _return = uint(self.length);
  }

  //@dev Adds new member
  function _addNewMember(ICommon.Pool[] storage self, uint poolId, address who) private returns( uint position) {
    // tracker = _getTracker(poolId);
    position = self[poolId].mems.length;
    self[poolId].mems.push(who);
    // if(who == _account(_msgSender())) pools[poolId].uints.tracker ++;
  }

  function _createPool(
    Data storage self, 
    ICommon.P1 memory p1, 
    ICommon.Mode mode, 
    uint poolId,
    function (uint, ICommon.FuncTag) internal _unlock
    ) private {
      bool(p1.duration > 0).assertChained3(p1.members.length > 0, p1.duration < type(uint8).max, "4");
      self.pools.push();
      self.pools[poolId].uints = ICommon.Uints(mode, p1.quorum, 0, p1.ccr, p1.duration * 1 days);
      self.pools[poolId].uint256s =  ICommon.Uint256s(p1.value, 0, p1.value);
      self.pools[poolId].addrs = ICommon.Addresses(p1.asset, address(0));
      _unlock(poolId, ICommon.FuncTag.ADD);
      // _unlock(poolId, FuncTag.ADD);
  }

  /**@dev Launches a new public band
      @param p1 : Encapsulates parameters required by this function.
    Note: We explicitly added the band creator to 2nd position.
   */
  function createPublicPool( 
    Data storage self, 
    ICommon.P1 memory p1,
    function (address) internal view returns(address) _account,
    // function (bool, address) internal view _check,
    function (uint, ICommon.FuncTag) internal _unlock
    // function (address, address, uint) internal _screenBalance
  )
    internal
    returns (uint poolId)
  {
    address alc = _account(p1.members[0]);
    self.amountExist[p1.value].assertNotUnchained("1");
    _screenBalance(p1.asset, alc, p1.value);
    poolId = _generateGroupIndex(self.pools);
    bool(p1.duration > 0).assertChained2(p1.duration < type(uint16).max, "4");
    _createPool(self, p1, ICommon.Mode(0), poolId, _unlock);
    _initializeAccount(self.pools, alc, p1.asset, address(0), true, poolId, true, true, p1.value);
    
  }

  /**@dev Launches a new private band
      @param p1 : Encapsulates parameters required by this function.
      Note: Caller must correspond to address at position 2 in the address array.
   */
  function createPrivatePool(
    Data storage self, 
    ICommon.P1 memory p1,
    function (address) internal view returns(address) _account,
    function (bool, address) internal view _check,
    function (uint, ICommon.FuncTag) internal _unlock
  ) 
    internal
    returns (uint poolId) 
  {
    _screenBalance(p1.asset, _account(_msgSender()), p1.value);
    poolId = _generateGroupIndex(self.pools);
    _createPool(self, p1, ICommon.Mode(1), poolId, _unlock);

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
      _initializeAccount(self.pools, alc, p1.asset, address(0), true, poolId, isAdmin, reduce, value);
    }
  }

  function _initializeAccount(
    ICommon.Pool[] storage self,
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
      ICommon.Info(_addNewMember(self, poolId, alc), 0, 0, 0, 0, 0, isAdmin, true, false), 
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
  function joinABand(
    ICommon.Pool[] storage self, 
    uint poolId,
    function (address) internal view returns(address) _account
  )
    internal
    returns (ICommon.Pool memory _pool, address alc) 
  {
    ICommon.Pool memory pool = _fetchPoolData(self, poolId);
    alc = _account(_msgSender());
    _screenBalance(pool.addrs.asset, alc, pool.uint256s.unit);
    bool(pool.mems.length < pool.uints.quorum).assertUnchained("5");
    
    if (pool.uints.mode == ICommon.Mode.STRICT) {
      bool(pool.mems[_fetchPosition(poolId, alc)] == alc).assertUnchained("7");
    }
    _initializeAccount(
      self,
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

    self[poolId].uint256s.currentPool += pool.uint256s.unit;
    _pool = _fetchPoolData(self, poolId);
  }

  function _getMode(ICommon.Pool[] storage self, uint poolId) internal view returns(ICommon.Mode mode) {
    mode = _fetchPoolData(self, poolId).uints.mode;
  }

   ///@dev Returns current timestamp (unix).
  function _now() internal view returns (uint) {
    return block.timestamp;
  }

  function _fetchPosition(uint poolId, address alc) internal view returns(uint pos) {
    pos = IAccount(alc).getSubscriptionInfo(poolId).position;
  } 

  ///@dev Modifies member's information 
  function _updateMemberData(
    Data storage self, 
    ICommon.UpdateParam memory upr,
    function (address) internal view returns(address) _account
  ) 
    private 
    returns (address valueTo, uint position) 
  {
    self.pools[upr.poolId].uint256s.currentPool = 0;
    // address _actual = _account(_msgSender());
    valueTo = upr.expected;
    
    ICommon.Info memory exp = IAccount(valueTo).getSubscriptionInfo(upr.poolId);
    position = exp.position;
    if (_account(_msgSender()) != upr.expected) {
      if (_now() > exp.turnTime + 1 hours) {
        assertIsMember(self.pools, upr.poolId, _account(_msgSender()), true);
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
        self.pcd.feeTo, 
        upr.pool.uint256s.currentPool, 
        upr.makerFee
      );
    }

    upr.poolId.safeInitializeInfo(
        ICommon.Info(exp.position, _now() + upr.pool.uints.duration, 0, upr.owings, 0, upr.colBals, exp.isAdmin, true, true),
        true,
        reduce,
        IAccount(valueTo),
        val,
        upr.pool.addrs.asset,
        address(0)
      );
    
    self.pools[upr.poolId].uints.selector ++;
  }

  function _swapPosition(
    address actual,
    address asset,
    uint poolId,
    ICommon.Info memory expected,
    address valueTo
  ) private 
    returns(ICommon.Info memory _expected) 
  {
    ICommon.Info memory act = IAccount(actual).getSubscriptionInfo(poolId);
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
  function _computePenalty(IDigesu.PublicData storage self, uint poolId, address user) internal view returns (uint256) {
    if (self.penFee == 0) return 0;

    return Utils.mulDivOp(IAccount(user).getSubscriptionInfo(poolId).colBals, self.penFee);
  }

  /**@dev Can update the penalty rate. Should be restricted to the owner or authorized admin. */
  function updatePenFee(IDigesu.PublicData storage self, uint8 newRate) internal {
    require(newRate <= type(uint8).max, "Invalid rate");
    self.penFee = newRate;
  }

  /**Utility to get finance
    @param self : Storage
    @param crp : Parameters.
  */
  function getFinance(
    Data storage self,
    ICommon.CreateParam memory crp
    // uint poolId,
    // function (uint, ICommon.FuncTag) internal _lock,
    // function (address) internal view returns(address) _account,
    // function () internal returns(uint) _getQFTPriceInETH
  ) 
    internal
    returns(address valueTo, uint position)
  {
    crp._lock(crp.poolId, ICommon.FuncTag.GET);
    ICommon.Pool memory pool = _fetchPoolData(self.pools, crp.poolId);
    if(pool.allGh == pool.uints.quorum) revert ICommon.AllMemberIsPaid();
    bool(pool.uint256s.currentPool >= ( pool.uint256s.unit * pool.uints.quorum)).assertUnchained("4");
    (uint mFee, uint owings) = ICommon.CMF(pool.uint256s.currentPool, self.pcd.makerFee).computeMakerFee();
    (valueTo, position) = _updateMemberData(
        self, 
        ICommon.UpdateParam(
        pool.mems[pool.uints.selector], 
        crp.poolId,
        owings,
        mFee,
        ICommon.CC(
            self.pcd.token, 
            crp._account(_msgSender()), 
            pool.uints.ccr, 
            crp._getQFTPriceInETH(), 
            pool.uint256s.currentPool
          ).computeCollateral(),
        pool
      ),
      crp._account
    );
    self.pools[crp.poolId].allGh ++;
  }

  ///@dev Returns info if current beneficiary has defaulted otherwise an empty struct is returned.
  function enquireLiquidation(ICommon.Pool[] storage self, uint poolId) internal view returns (ICommon.Liquidation memory) {
    ICommon.Pool memory _p = _fetchPoolData(self, poolId);
    ICommon.Info memory info = IAccount(_p.addrs.lastPaid).getSubscriptionInfo(poolId);
    return _now() > info.payDate ? ICommon.Liquidation(
      info.position, 
      _p.addrs.lastPaid,
      info.payDate,
      info.owings, 
      info.colBals
    ) : ICommon.Liquidation(0, address(0), 0, 0, 0);
  }


  /**
    @dev Liquidates defaulter.
          - If the current beneficiary defaults, they're liquidated.
          - Their collateral balances is forwarded to the liquidator.

  */
  function liquidate(
    Data storage self, 
    uint poolId, 
    address who,
    function (address) internal view returns(address) _account
  ) 
    internal 
    returns (address _liq, uint amount)
  {
    ICommon.Liquidation memory liq = enquireLiquidation(self.pools, poolId);
    address alc_who = _account(who);
    _liq = liq.who;

    ICommon.Info memory info_liq = IAccount(_liq).getSubscriptionInfo(poolId);
    if(_liq == address(0)) revert("11");
    address token = _fetchPoolData(self.pools, poolId).addrs.asset;
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

    self.pools[poolId].addrs.lastPaid = alc_who;
    amount = info_liq.owings;
    self.pcd.token.moveCollateral(alc_who, _liq, info_liq.colBals);
  }

  /**
    @dev Cancels recent unfil band.
      Only admin of a band can cancel only if no one has join the band.
  */
  function cancelBand(
    Data storage self,
    uint poolId,
    function (address) internal view returns(address) _account
  ) 
    internal
    returns (uint value, address alc)
  {
    ICommon.Pool memory _p = _fetchPoolData(self.pools, poolId);
    alc = _account(_msgSender());
    // uint8 quorum = uint8(pools[poolId].uints.quorum);
    if(_p.uints.mode == ICommon.Mode.NONSTRICT) {
      bool(_p.mems.length == 1).assertUnchained("15");
      delete self.amountExist[_p.uint256s.unit];
    }
    if(_p.uints.mode == ICommon.Mode.STRICT) bool(_p.uint256s.currentPool == _p.uint256s.unit).assertUnchained("15");
    _p.addrs.asset.safeUpdateBalancesInUse(
      IAccount(alc),
      _p.uint256s.unit, 
      true
    );
    value = _p.uint256s.unit;

  }

  /**@dev Payback borrowed fund.
      Note: We are only concerned about who is to pay back and not 
              who is paying back. Ordianrily, any of the members can pay 
              on behalf of another.
  */
  function payback(
    Data storage self,
    uint poolId,
    function (address) internal view returns(address) _account,
    function (uint, ICommon.FuncTag) internal _lock,
    function (uint, ICommon.FuncTag) internal _unlock
  ) 
    internal
    returns(ICommon.GCB memory _return, address alc) 
  {
    ICommon.Pool memory _p = _fetchPoolData(self.pools, poolId);
    ICommon.Info memory _info = IAccount(_account(_msgSender())).getSubscriptionInfo(poolId);
    (, uint _engaged, uint _mostRecent) = IAccount(_account(_msgSender())).getSpendableBalance(_p.addrs.asset);
    bool(_info.owings > 0).assertChained2((_mostRecent - _engaged) >= _info.owings, "5"); // <=====

    _return = ICommon.GCB(
      _p.addrs.asset, 
      _account(_msgSender()), 
      address(0), 
      _info.colBals,
      0,
      ICommon.CR(0, 0),
      ICommon.CR2(_info.payDate, _p.uint256s.unit)
    );

    _info.turnTime = 0;
    _info.owings = 0;
    _info.payDate = 0;
    if(_p.allGh == _p.uints.quorum) {
      _lock(poolId, ICommon.FuncTag.PAYBACK);
      _unlock(poolId, ICommon.FuncTag.COMPLETE);
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
  function roundUp(
    Data storage self,
    uint poolId
    // address who
  ) 
    internal
    returns(ICommon.Pool memory pool)
  {
    pool = _fetchPoolData(self.pools, poolId);
    bool(pool.allGh == pool.uints.quorum).assertUnchained("16");
    address lastPaid = pool.addrs.lastPaid;
    if(pool.uints.mode == ICommon.Mode.NONSTRICT) delete self.amountExist[pool.uint256s.unit];
    uint _poolId = poolId;
    _poolId.safeSplit(
        IAccount(lastPaid),
        pool.addrs.asset,
        pool.mems,
        self.pcd.feeTo,
        pool.uint256s.unit, 
        IAccount(lastPaid).getSubscriptionInfo(_poolId).owings
    );
  }

  function updatePublicData(
    Data storage self,
    address feeTo,
    address token,
    uint8 penFee,
    uint8 makerFee
  ) internal {
    if(feeTo == address(0)) revert ICommon.ZeroAddress(feeTo);
    if(token == address(0)) revert ICommon.ZeroAddress(token);
    bool(penFee < type(uint8).max).assertChained2(makerFee < type(uint8).max, "19");
    self.pcd = IDigesu.PublicData(feeTo, token, penFee, makerFee);
  }

  // function setSupportedTokens(
  //   address newToken,
  //   function (address) internal _setSupportedToken 
  // ) public override onlyOwner {
  //   _setSupportedTokens(newToken);
  // }


}