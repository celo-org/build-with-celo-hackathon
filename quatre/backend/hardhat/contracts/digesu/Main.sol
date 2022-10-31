// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./SubMain.sol";
import "./libs/Ownable.sol";
import "./interfaces/IAccount.sol";


/** 
  Digesu
    ======
    A multi-peer finance structure that allows many parties come together, contribute money
    in equal amount for the purpose of financing themselves in a rotational manner. All the 
    participant is lender and borrower same time. Each beneficiary pays back with very minimal
    maker rate that's almost insignificant ranging between as little as 0.1 to 5%. The maker 
    rate being an amount charged in favor of the platform.

    For every successful circle, all the participant is entitled to farming reward in QFT, with 
    which they can make more profit. We also bountily reward best performing band every 3 months. 

      Example: A 3-man band (A, B, C) created with unit amount 1 ETH.
              - 'A' launches the band with a commitment of 1 ETH, becomes the admin
              - 'A' is added to slot 1, and a trustee is created for the band.
              - 1 ETH is forwarded to trustee.
              - 'B' joins with commitment of 1 ETH, added to slot 2.
              - 'C' joins with commitment of 1 ETH, added to slot 3.
              - There is 3 ETH locked with Trustee, and "A's" time to withdraw is now.
              - Join function is disabled, and 'GetFinance' is unlocked.
              - 3 ETH is available to 'B' to withdraw.
              - 'B's wallet is screened for enough collateral (QFT).
                o If true, 3 ETH is sent to 'B' otherwise operation failed.
                o If time for 'B' to withdraw has passed, any member of the band
                  who is the current caller will replace "B's" position, and claim
                  the fund.
                o Assume 'C' calls, "C's" position is swapped with "B's".

                    CIRCUIT BREAK
                    -------------
                    o There is a circuit break when any member of such band explicitly call the roundUp().
                    o This can only be done when all the participants has successfully 'GETFINANCED'.

                PAYBACK: 
                ======
                o Any member that 'GETFINANCE' has a payback period which was initially specified 
                  by the admin.
                o If the payback period elapsed, nothing is done, until someone calls to liquidate
                  the defaulter.
                o If after time elapsed, the beneficiary calls, they're surcharge with 5% of the 
                  collateral balance (in token value). The penalty is charged in favor of the next
                  on the queue to 'GETFINANCE', and his/her account is credited. The balance being
                  the amount left after 5% deduction is released to the owner.
                o If the beneficiary stays within expected repayment time (ERP), the above shall not
                  apply. Their collateral balance is unlocked immediately.
                
                LIQUIDATION
                ==========
                o Anyone (either a member or outsider) can liquidate the defaulter. When this happens,
                  the liquidator absorbs the current debt (exact amount or greater must be sent along
                  with the call). They absorbs fully the profile of the defaulter including the collateral
                  balances. The circle then continues.

     ERROR CODE
     ==========
  1. Function not available.
  2. Value is below minimum.
  3. Not a member.
  4. Pool not ready.
  5. No debt found.
  6. User is yet to default payment.
  7. Address is empty.
  8. Price is empty.
  9. Members exceed limit.
  10. Already a member of this band.
  11. Value out of bound.
 */
contract Main is SubMain, Ownable {
  using Utils for *;
    
  // Creation fee
  uint public creationFee;

  // Minimum amount that can be contributed
  uint public minimumPoolAmount;

  /**Other statistical data - Read-only
      o Total Values contributed todate;
      o Total subscribers;
  */
  CR public cr;

  ///@dev All of the bands user subscribed to
  // mapping(address => uint[]) public allMyBands;

  constructor(address token, uint _minimumPoolAmount, address feeTo) SubMain(token, feeTo) {
    minimumPoolAmount = _minimumPoolAmount;
  }

  /**
    @dev Compares number of participants.
      @param quorum - Number that should make up the required participants.
  */
  modifier validateQuorum(uint8 quorum) {
    bool(quorum > 0).assertChained2(quorum <= type(uint8).max, "9");
    _;
  }

  //Fallback - Forward unsolicited Ether.
  receive() external payable {
    Address.sendValue(payable(pcd.feeTo), msg.value);
  }

  /**
    @dev Launches a public band - Native currency i.e ETH or Platform currency.
      @param quorum - Required number of participants to form a band. 
      @param durationInDays - The maximum time limit (from when the turn time begins) with which a participant
                                will take custody of the loan before repayment.
      @param colCoverageRatio - Collateral factor - determinant of the amount of collateral to require of gFer.
                                  This is expressed as a multiple index of total loanable amount.
      @param amount - Unit contribution.
      @param asset - address of the ERC20 standard asset to use.
                Note: asset must be supported by digesu.
  */
  function createPublicPool(
    uint8 quorum, 
    uint8 durationInDays, 
    uint16 colCoverageRatio, 
    uint amount,
    address asset) 
      external 
      whenNotPaused
      validateQuorum(quorum)
      returns (bool)
  {
      address[] memory addrs = new address[](1);
      addrs[0] = _msgSender();
      (uint newPoolId) = _createPublicPool(P1
        (
          uint8(quorum),
          durationInDays,
          colCoverageRatio,
          amount,
          addrs,
          asset
        )
      );

    emit BandCreated (newPoolId, _fetchPoolData(newPoolId));
    return true;
  }

  
  /**
    @dev Launches a public band - Native currency i.e ETH or Platform currency.
      @param durationIndays - The maximum time limit (from when the turn time begins) with which a participant
                                will take custody of the loan before repayment.
      @param colCoverateRatio - Collateral factor - determinant of the amount of collateral to require of gFer.
                                  This is expressed as a multiple index of total loanable amount.
      @param members- List of expected members.
      @param asset - Asset's contract address.
      @param amount - Contribution amount.
  */
  function createPrivatePool(
    uint8 durationIndays, 
    uint16 colCoverateRatio, 
    address[] memory members, 
    address asset,
    uint amount) 
      external 
      whenNotPaused
      validateQuorum(uint8(members.length))
      returns(bool)
  {
    uint quorum = members.length;
    uint newPoolId = _createPrivatePool(P1
      (
        uint8(quorum),
        durationIndays,
        colCoverateRatio,
        amount,
        members,
        asset
      )
    );
    emit BandCreated (newPoolId, _fetchPoolData(newPoolId));
    
    return true;
  }

  /**
    @dev Updates minimum amount contribution amount
      Note: Only Owner have the privilege to call this function.
  */
  function updateMinPoolAmount(uint256 newAmount) public onlyOwner {
    minimumPoolAmount = newAmount;
  }
  
  /**@dev Add new member.
      @param poolId : Band index.
        Note: We set up a trustee to hold all funds in the pool at poolId in trust 
                  for all members.
   */
  function joinABand(uint poolId) 
    external
    whenNotPaused
    checkFunctionPass(poolId, FuncTag.ADD)
    returns(bool)
    {
      (Pool memory _p, address alc) = _joinABand(poolId);
      cr.totalValueContributed += _p.uint256s.unit;
      cr.subscribers ++;
      if (_p.mems.length == _p.uints.quorum) {
        _lock(poolId, FuncTag.ADD);
        _unlock(poolId, FuncTag.GET);
        require(IAccount(alc).updateTurnTime(poolId), "Failed");
      }

      emit Joined(poolId, alc, _p.uint256s.unit);

      return true;
  }

  /**@dev Members of a pool can pick up the contributed fund when certain coditions
          are met.
      @param poolId : Band's Id which caller belong to.
        Note:
   */
  function getFinance(uint poolId) 
    external
    whenNotPaused 
    checkFunctionPass(poolId, FuncTag.GET)
    returns(bool)
  {
   (address valueTo, uint position) = _getFinance(poolId);

    emit GetFinanced(poolId, position, valueTo);
    return true;
  }

  /**
    @dev Utility to payback borrowed fund.
      @param poolId : Pool number.
      Note: We are only concerned about who is to pay back and not 
              who is paying back meaning any of the members can pay 
              on behalf of another.
   */
  function payback(uint poolId) 
    external 
    whenNotPaused 
    returns(bool)
  {
    (GCB memory gcb, address alc) = _payback(poolId);
    CR memory _cr = cr;
    gcb.cr = _cr;
    Utils.unlockCollateral(gcb);

    emit Payback(poolId, gcb.cr2.valueContributed, alc);
    return true;
  }

  /**
    @dev Liquidates defaulter.
      Note: The expected repayment time for last paid must have passed.
   */
  function liquidate(uint poolId) 
    external 
    whenNotPaused
    returns(bool)
  {
    (address liq, uint amount) =_liquidate(poolId, _msgSender()) ;
    emit Payback(poolId, amount, liq);

    return true;
  }

  // See SubMain._enquireLiquidation(pid);
  function enquireLiquidation(uint poolId) external view returns(Liquidation memory)  { 
    return _enquireLiquidation(poolId); 
  }

  //See SubMain.sol
  function roundUp(uint poolId) 
    external
    whenNotPaused 
    checkFunctionPass(poolId, FuncTag.COMPLETE) returns(bool)  { 
      _roundUp(poolId, _msgSender());

      return true;
    }

  ///@dev Pauses contract
  function pause() public onlyOwner {
    _pause();
  }

  ///@dev Unpauses contract
  function unpause() public onlyOwner {
    _unpause();
  }

  ///@dev Updates penalty fee.
  function updatePublicData(
    address feeTo,
    address token,
    uint8 penFee,
    uint8 makerFee
  ) public override onlyOwner 
  {
    updatePublicData( feeTo, token, penFee, makerFee );
  }

  // See SubMain.cancelBand(pid, who);
  function cancelBand(uint poolId) 
    external
    whenNotPaused
    returns(bool)
  {
    _cancelBand(poolId);

    return true;
  }

  // See SubMain._getPools()
  function allPools() public view returns(Pool[] memory) {
    return _getPools();
  }

  // //See SubMain._setFeeTo(newFeeTo);
  // function setFeeTo(address newFeeTo) public override onlyOwner {
  //   setFeeTo(newFeeTo);
  // }

  function setSupportedTokens(address newToken) public override onlyOwner {
    super.setSupportedTokens(newToken);
  }

  function supportedToken(address _token) external view returns(bool) {
    return _supportedToken(_token);
  }
}
