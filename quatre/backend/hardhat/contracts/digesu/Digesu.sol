// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "./DigesuLib.sol";

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

contract Digesu is IDigesu, Currency, FuncHandler, Pausable, Ownable {
  using Utils for bool;
  using DigesuLib for *;

  Data private data;

    // Creation fee
  uint public creationFee;

  // Minimum amount that can be contributed
  uint public minimumPoolAmount;

  IAccountManager public manager;

    /**Other statistical data - Read-only
      o Total Values contributed todate;
      o Total subscribers;
  */
  CR public cr;

  modifier validateId(uint poolId) {
    data.pools.comparePoolSize(poolId);
    _;
  }
  
  // Only when user is a member.
  modifier memberStatus(uint poolId, address who, bool value, Mode mode) {
    data.pools.assertIsMember(poolId, who, value);
    _;
  }
  
  /**
    @dev Compares number of participants.
      @param quorum - Number that should make up the required participants.
  */
  modifier validateQuorum(uint8 quorum) {
    if(quorum == 0) revert InvalidInput();
    if(quorum > type(uint8).max) revert InvalidInput();
    // bool(quorum > 0).assertChained2(quorum <= type(uint8).max, "9");
    _;
  }

  /**@dev Scrutinize account from _msgSender if it exist
   * or not. 
   * Note: Execution depends on the 'value'
   */
  modifier checkIfAccountExist(address who, bool value) {
    _check(value, who);
    _;
  }

  modifier validateList(address[] memory members, Mode mode) {
    if(mode == Mode.STRICT) {
      if(members.length <= 1) revert InsufficientQuorum();
      // require(members.length > 1, "19");
    }
    require(members[0] ==_msgSender(), "19");
    _;
  }

}