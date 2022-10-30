// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// import "../libs/Context.sol";
// import "../interfaces/IERC20.sol";
import "../interfaces/IAccount.sol";
import "../interfaces/IMain.sol";
import "../libs/Utils.sol";
import "../libs/Ownable.sol";
import "../libs/ReentrancyGuard.sol";

/**
  @title Account: 

  Error Code:
    1. Token not supported.
    2. Trying to deposit zero value.
    3. UnAuthorizedCaller.
*/
contract Account is IAccount, Context, Ownable, ReentrancyGuard {
  using Utils for *;

  // Address of Router
  address payable private router;

  // Address of the Mother branchup
  address private branchUp;

  //Total amount engaged at any time
  uint private engaged;

  // All Subscriptions
  mapping (uint=>Info) private subscriptionInfo;

  /**@dev Stores balances related to erc20 addresses at anytime
   * both withdrawable and engaged balances.
  */
  mapping (address=>mapping(Balances=>uint)) public balances;

  /**@dev Initializes state variables.
   *  o We set factory as the router with exclusive access to certain 
   *      sensitive functions.
   *  o @param newOwner : i.e the calling EOA is set as the sole owner.
   */
  constructor (address newOwner) payable {
    router = payable(_msgSender());
    transferOwnership(newOwner);
  }

  /**@dev
   * Owner cannot withdraw if account is engaged.
   * This type restriction is enforced to avoid replay && DOS attack 
   * by the owner in certain conditions.
   * Both currencies are by default gated.
  */
  modifier syncBalances(address token, uint _amtToWithdraw, uint optionalArg) {
    if(token == address(0)) revert ZeroAddress(token);
    _syncBalances(token, optionalArg);
    uint withdrawable = balances[token][Balances.WITHDAWABLE];
    if(_amtToWithdraw > withdrawable) revert InsufficientFund(
      withdrawable, _amtToWithdraw
    );
    _;
  }

  /**@dev
   *  Only supported assets are allowed i.e NATIVE or ERC20
   * @param erc20Address Incoming token address
   * Note Address must not be the zero address.
  */
  modifier isSupportedToken(address erc20Address) {
    if(erc20Address == address(0)) revert ZeroAddress(erc20Address);
    if(!IMain(_router()).supportedToken(erc20Address)) revert UnsupportedAsset(erc20Address);
    _;
  }

  modifier onlyRouter() {
    require(_msgSender() == _router(), "Account.sol: OnlyRouter");
    _;
  }

  // Fallback
  receive() external payable { }

  // /**@dev Returns subscrition detail for the pool at 'poolId'
  //  * Note: Read information from this Account based on 'poolId'.
  //  * @param poolId - Exact pool index.
  //  */
  // function getSubscription(uint poolId) external view returns (Info memory _sub) { _sub = subscriptionInfo[poolId]; }

  // /**@dev
  //  * 
  //  */
  // function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
  
  // Returns router - Gas saving.
  function _router() internal view returns(address _fetched) { _fetched = router; }

  /**
   * @notice Alternate function to deposit netork asset. 
   * Note Public function, no restriction.
  */
  function depositNative() external payable { require(msg.value > 0, "2"); }

  function _syncBalances(address token, uint optionalArg) private {
    uint _balInUse = balances[token][Balances(1)];
    balances[token][Balances.WITHDAWABLE] = token == address(this)? address(this).balance : IERC20(token).balanceOf(address(this));
    balances[token][Balances.WITHDAWABLE] -= ( _balInUse + optionalArg );
  }

  /**
   * @notice Utility to deposit ERC20 token 
   * Note Public function, no restriction. Only that token must be supported.
   * @param erc20Address Address of the depositing token.
   * @param amount Deposit amount.
   * @return null
  */
  function depositERC20Token(address erc20Address, uint256 amount) external isSupportedToken(erc20Address) returns(bool) {
    IERC20(erc20Address).transferFrom(_msgSender(), address(this), amount).assertUnchained('Transfer Failed');
    _syncBalances(erc20Address, 0);

    return true;
  }

    /**
   * @notice Utility to withdraw network asset.
   * Note Restricted
  */
  function withdrawNativeOnlyRouter(
    uint amount, 
    uint fee, 
    address to, 
    address feeTo
    ) external onlyRouter nonReentrant syncBalances(address(this), amount, fee){
    (bool j,) = feeTo.call{value: fee}("");
    (bool i,) = to.call{value: amount}("");

    require(i && j, "Transfered failed");
  }

  function withdrawNativeOnlyOwner(uint amount) 
    public
    onlyOwner
    syncBalances(address(this), amount, 0)
  {
    payable(owner()).transfer(amount);
  }

  /**
   * @notice Get the balance ERC20 token 
   * Note Public function, no restriction. Only that token must be supported.
   * @param erc20Address Address of the depositing token.
   * @return _balances 
  */
  function erc20Balances(address erc20Address) external view isSupportedToken(erc20Address) returns(uint256 _balances) {
    return _balances = IERC20(erc20Address).balanceOf(address(this));
  }

  /**
   * @notice Get the balance ERC20 token 
   * Note Public function, no restriction. Only that token must be supported.
  */
  function withdrawERC20TokenOnlyOwner(
    address erc20Address, 
    uint amount
  ) 
    public 
    onlyOwner 
    isSupportedToken(erc20Address) 
  {
    _withdraw(erc20Address, owner(), amount, 0);
  }

  function _withdraw(
    address asset, 
    address to, 
    uint amount,
    uint optArg
  ) private nonReentrant syncBalances(asset, amount, optArg) {
    IERC20(asset).transfer(to, amount);
    _updateBalancesInUse(asset, amount, true);
  }

  function withdrawRouterOnly(
    address token, 
    address to,
    address feeTo,
    uint amount, 
    uint fee) external onlyRouter  returns(bool) {
      _withdraw(token, to, amount, fee);
      _withdraw(token, feeTo, fee, 0);

      return true;
  }

  /**
   * @notice Returns subscription information for owner relating to poolId
   * Note For every pool the owner has subscribed to, they can fetch data relating to each band.
   * @param poolId index of band.
   * @return Info
  */
  function getSubscriptionInfo(uint poolId) external view returns(Info memory) {
    return subscriptionInfo[poolId];
  }

  function setStatus(
    uint poolId,
    bool isAdmin, 
    bool isMember
  ) external onlyRouter returns(bool) {
    subscriptionInfo[poolId].isAdmin = isAdmin;
    subscriptionInfo[poolId].isMember = isMember;
   
    return true;
  }

  /**@dev Router updates balance in use. 
   * Note Callable only by the Mother branchup.
  */
  function updateBalancesInUse(address asset, uint value, bool reduce) external onlyRouter returns(bool) {
    _updateBalancesInUse(asset, value, reduce);
    return true;
  }

  function _updateBalancesInUse(address asset, uint value, bool reduce) private {
    reduce? balances[asset][Balances.INUSE] -= value : balances[asset][Balances.INUSE] += value;
  }

  function getSpendableBalance(address token) external view returns(uint _withdrawable, uint _engaged, uint _mostRecent) {
    _withdrawable = balances[token][Balances.WITHDAWABLE];
    _engaged = balances[token][Balances.INUSE];
    _mostRecent = token == address(0) ? IERC20(token).balanceOf(address(this)) : address(this).balance;
  }

  function approve(address erc20Address, uint amount) public onlyOwner isSupportedToken(erc20Address) {
    IERC20(erc20Address).approve(_router(), amount);
  }

  function updateTurnTime(uint poolId) external returns(bool) {
    subscriptionInfo[poolId].turnTime = block.timestamp + 1 hours;
    return true;
  }

  function initializeInfo(
    Info memory info, 
    bool lock,
    bool reduceBalance,
    uint poolId,
    uint value,
    address asset,
    address to
  ) external returns(bool) {
    subscriptionInfo[poolId] = info;
    if(lock) {
      _updateBalancesInUse(asset, value, reduceBalance);
    } else {
      _withdraw(asset, to, value, 0);
    }

    return true;
  }

  function clearSubscrition(uint poolId) external onlyRouter returns(bool) {
    delete subscriptionInfo[poolId];
    // _withdraw(asset, to, value, 0);
    return true;
  }

  // function updateMember(uint poolId) external returns(bool) {
  //   subscriptionInfo[poolId].isMember = true;
  // }

}