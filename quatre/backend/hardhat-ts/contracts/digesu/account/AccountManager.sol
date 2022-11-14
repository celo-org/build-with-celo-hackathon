// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "../interfaces/ICommon.sol";
import "./Account.sol";
import "../interfaces/IAccount.sol";
import "../interfaces/IAccountManager.sol";

/**@title AccountManager: standalone contract that manages account creation, 
   deletion, including read and write data.

   Author: Bobeu
   Github: https://github.com/bobeu
 */
contract AccountManager is IAccountManager, ICommon, Ownable {
  uint public accountsCounter;

  // Acount creation fee
  uint private accountCreationFee;

  //Address to receive fee
  address private feeTo;

  // Digesu factory contract address
  address public factory;

  //Approvals to upgrade to a new account
  mapping(address=>bool) public approvals;

  ///@dev Users mapped to records
  mapping (address=>Accounts) private accounts;

  // constructor () {}

  modifier scrutinizeAccount(address who, bool value, string memory errorMessage) {
    require(hasAccount(who) ==  value, errorMessage);
    _;
  }
  
  /**@dev Return true if "who's" account status is not empty
       otherwise false.
   */
  function hasAccount(address who) public view override returns (bool) {
    return accounts[who].active != address(0);
  }

  // Set account creation fee : Should be called only by the multisig account
  function setAccountCreationFee(uint newFee) public onlyOwner {
    accountCreationFee = newFee;
  }
  
  // Returns account for 'who'
  function getAccount(address who) external view returns (address) { 
    return accounts[who].active; 
  }
  
  /**@dev Launches new INTERACTIVE account for 'who'.
   * If fee is applied, msg.value must meet minimum creationFee otherwise, creation fail.
   * Owner can prefund account at construction if they wish do so. They only have to increase the msgValue
   * above minimum accountCreationFee.
  */
  function createAccount(uint initialAccountBalance, address who)
    external 
    payable
    scrutinizeAccount(who, false, "User exist")
    returns(address newAlc) 
  {
    require(msg.value >= accountCreationFee && feeTo != address(0), "3");
    accountsCounter ++;
    newAlc = address(new Account{value: initialAccountBalance}(who, _getFactory()));
    accounts[_msgSender()].active = newAlc;

    emit AccountLaunched(newAlc, _msgSender());
  }

  // Reset address to receive fee : only by owner account.
  function changeFeeTo(address newFeeTo) public onlyOwner {
    if(newFeeTo == address(0)) revert ZeroAddress(newFeeTo);
    feeTo = newFeeTo;
  }

  //Reset factory address : onlyOwner
  function setFactory(address newFactory) public onlyOwner {
    if(newFactory == address(0)) revert ZeroAddress(newFactory);
    factory = newFactory;
  }

  /**@dev Upgrade to a new account.
   * @param newAccount : New account to upgrade to.
   * Note : newAccount must be approved prior to this call
   */
  function rekeyAccount(address newAccount) 
    external
    scrutinizeAccount(_msgSender(), true, "User not exist")
    returns(bool) 
  {
    if(!approvals[newAccount]) revert AccountNotApproved();
    address oldAlc = accounts[_msgSender()].active;
    require(factory != address(0) && _msgSender() == factory, "Denied");
    if(!IAccount(oldAlc).rekey(newAccount)) revert SomethingWentWrong();

    emit Rekeyed(oldAlc, newAccount);
    return true;
  }

  /**@dev Approves new account for upgrade
   * Note : Same utility can also disapprove
  */
  function setApproval(address newAccount, bool _approval) public onlyOwner {
    if(approvals[newAccount] == _approval) revert StatusAlreadyUpdated();
    approvals[newAccount] = _approval;
  }

  ///@dev Deactivate account for 'target'
  function deactivateAccount(address target) 
    public
    onlyOwner
    scrutinizeAccount(target, true, "User is deactivated")
  {
    Accounts memory alcs = accounts[target];
    accounts[target] = Accounts(alcs.deactivated, alcs.active);
  }

  ///@dev Aactivate account for 'target'
  function activateAccount(address target) 
    public
    onlyOwner
    scrutinizeAccount(target, false, "User is deactivated")
  {
    Accounts memory alcs = accounts[target];
    if(alcs.deactivated == address(0)) revert TargetHasNoAccount();
    accounts[target] = Accounts(alcs.deactivated, alcs.active);
  }

  function _getFactory() internal returns(address _fact) {
    factory = _fact;
  }
}