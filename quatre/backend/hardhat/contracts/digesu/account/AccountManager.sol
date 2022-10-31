// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
import "../interfaces/ICommon.sol";
// import "../libs/Context.sol";
import "./Account.sol";
// import "../libs/Ownable.sol";

/**@title AccountManager
 * * Interactive account is a separate entity distinct fron the owner. 
   * They are able to interact with most Digesu's products. Routers interact directly with
   * accounts, not the owner. They own power to approve or disapprove transactions.
   * Routers read and push information to accounts.
   * Note: Routers don't take actions unless triggered by the owner.
   * 
   * ERROR CODE
   * ..........
   * 1. Acount exists.
   * 2. Acount does not exist.
   * 3. Insufficient value.
 */
abstract contract AccountManager is ICommon, Context{
  event NewAccount(
    address indexed newAlc, 
    address indexed who,
    uint _accountsCounter
  );

  uint public accountsCounter;

  // Acount creation fee
  uint private accountCreationFee;

  ///@dev Users mapped to records
  mapping (address=>address) private accounts;
  
  /**@dev Scrutinize account from _msgSender if it exist
   * or not. 
   * Note: Execution depends on the 'value'
   */
  modifier checkIfAccountExist(address who, bool value) {
    _check(value, who);
    _;
  }

  /**@dev If 'value' is true, 'who' must not already own an account
   * otherwise, 'who' must own an account before now.
   */
  function _check(bool value, address who) internal view {
    value? require(_account(who) == address(0), "1") : require(_account(who) != address(0), "2");
  }

  // Set account creation fee : Should be called only by the multisig account
  function setAccountCreationFee(uint newFee) public virtual {
    accountCreationFee = newFee;
  }
  
  // Returns account for 'who'
  function _account(address who) internal view returns (address _alc) { _alc = accounts[who]; }
  
  /**@dev Launches new INTERACTIVE account.
   * If fee is applied, msg.value must meet minimum creationFee otherwise, creation fail.
   * Owner can prefund account at construction if they wish do so. They only have to increase the msgValue
   * above minimum accountCreationFee.
  */
  function createAccount(uint value) external payable checkIfAccountExist(_msgSender(), true) returns(address newAlc) {
    accountsCounter ++;
    uint _cFee = accountCreationFee;
    require(msg.value >= _cFee, "3");
    newAlc = address(new Account{value: value}(_msgSender()));
    accounts[_msgSender()] = newAlc;

    emit AccountLaunched(newAlc, msg.sender);
  }
}