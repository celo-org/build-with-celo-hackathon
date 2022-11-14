// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

// import "../libs/Context.sol";
// import "../interfaces/IERC20.sol";
import "../interfaces/IAccount.sol";
import "../interfaces/IDigesu.sol";
import "../libs/Utils.sol";
import "../libs/Ownable.sol";
import "../libs/ReentrancyGuard.sol";
import "../libs/Address.sol";

/**
  @title Account: 
    Interactive account is a separate entity distinct fron the owner. 
    They are able to interact with most Digesu's products. Routers interact directly with
    accounts, not the owner. They own power to approve or disapprove transactions.
    Routers read and push information to accounts only on trigger by the owner.
      - An exceptional case is where funds need to be moved to the next person.
      - In such case, the owner must have pay back and approve Router to spend 
         from their account. Usually, Router locks the amount in user's account
         until the need for it arise.
    Note: Routers don't take actions unless triggered by the owner.

  Error Code:
    1. Token not supported.
    2. Trying to deposit zero value.
    3. UnAuthorizedCaller.
*/
contract Account is IAccount, Context, Ownable, ReentrancyGuard {
  using Utils for *;

  // Address of Router
  address payable private router;

  //Manager contract
  address public manager;

  // Address of the Mother branchup
  address private branchUp;

  //Total amount engaged at any time
  uint private engaged;

  // Control contract execution
  bool private _pause;

  // Supported assets
  address[] private supportedAssets;

  // Mapping of added supported assets
  mapping (address=>bool) public added;

  // All Subscriptions
  mapping (uint=>Info) public subscriptionInfo;

  /**@dev Stores balances related to erc20 addresses at anytime
   * both withdrawable and engaged balances.
  */
  mapping (address=>mapping(Balances=>uint)) public balances;

  /**@dev Initializes state variables.
   *  o We set factory as the router with exclusive access to certain 
   *      sensitive functions.
   *  o @param newOwner : i.e the calling EOA is set as the sole owner.
   */
  constructor (address newOwner, address router_) payable {
    router = payable(router_);
    _pause = false;
    manager = payable(_msgSender());
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

  modifier whenNotPaused() {
    if(_pause) revert ExecutionStopped();
    _;
  }

  /**@dev
   *  Only supported assets are allowed i.e NATIVE or ERC20
   * @param erc20Address Incoming token address
   * Note Address must not be the zero address.
  */
  modifier isSupportedToken(address erc20Address) {
    if(erc20Address == address(0)) revert ZeroAddress(erc20Address);
    if(!IDigesu(_router()).supportedToken(erc20Address)) revert UnsupportedAsset(erc20Address);
    if(!added[erc20Address]) {
      added[erc20Address] = true;
      supportedAssets.push(erc20Address);
    }
    _;
  }

  modifier onlyRouter() {
    require(_msgSender() == _router(), "Account.sol: OnlyRouter");
    _;
  }

  // Fallback
  receive() external payable { 
    revert IDoNotAcceptEtherIFYouForceItLost();
  }

  // /**@dev Returns subscrition detail for the pool at 'poolId'
  //  * Note: Read information from this Account based on 'poolId'.
  //  * @param poolId - Exact pool index.
  //  */
  // function getSubscription(uint poolId) external view returns (Info memory _sub) { _sub = subscriptionInfo[poolId]; }

  // /**@dev
  //  * 
  //  */
  // function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
  
  /**@dev Utility to upgrage to a new account.
   * Note : New account must be approved from the accout manager
   *        before they can be upgraded.
   */
  function rekey(address newAccount) external returns(bool) {
    require(_msgSender() == manager, "NA");
    address[] memory _assets = supportedAssets;
    for (uint i = 0; i < _assets.length; i++) {
      address asset = supportedAssets[i];
      uint bal = IERC20(asset).balanceOf(address(this));
      if(bal > 0) {
        require(IERC20(asset).transfer(newAccount, bal), "Error");
      }
    }
    Address.functionCallWithValue(
      newAccount,
      abi.encodeWithSelector(
        bytes4(keccak256(bytes("accept(address[] memory)"))), 
        _assets
      ),
      address(this).balance
    );
    transferOwnership(manager);
    haltExecution();

    return true;
    // SafeCallAccount.safeTransferData(newAccount, _assets);
  }

  function haltExecution() private  {
    _pause = true;
  }

  // Returns router - Gas saving.
  function _router() internal view returns(address _fetched) { _fetched = router; }

  /**
   * @notice Alternate function to deposit netork asset. 
   * Note Public function, no restriction.
  */
  // function depositNative() external payable { require(msg.value > 0, "2"); }

  /**@dev Synchronizes balances. We update both balances each time this 
      function is called.
      @param token : Address of the ERC20 supported asset.
      @param optionalArg : is any value that should be deducted along with the actual
                            value sent in call such as makerFee or Router commission.
   */
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
  function depositERC20Token(address erc20Address, uint256 amount) 
    external
    whenNotPaused
    isSupportedToken(erc20Address) 
    returns(bool) 
  {
    IERC20(erc20Address).transferFrom(_msgSender(), address(this), amount).assertUnchained('Transfer Failed');
    _syncBalances(erc20Address, 0);

    return true;
  }

  // /**
  //  * @notice Utility to withdraw network asset.
  //  * Note Restricted
  // */
  // function withdrawNativeOnlyRouter(
  //   uint amount, 
  //   uint fee, 
  //   address to, 
  //   address feeTo
  //   ) external onlyRouter nonReentrant syncBalances(address(this), amount, fee){
  //   (bool j,) = feeTo.call{value: fee}("");
  //   (bool i,) = to.call{value: amount}("");

  //   require(i && j, "Transfered failed");
  // }

  // function withdrawNativeOnlyOwner(uint amount) 
  //   public
  //   onlyOwner
  //   syncBalances(address(this), amount, 0)
  // {
  //   payable(owner()).transfer(amount);
  // }

  /**
   * @notice Get the balance ERC20 token 
   * Note Public function, no restriction. Only that token must be supported.
   * @param erc20Address Address of the depositing token.
   * @return _balances 
  */
  function erc20Balances(address erc20Address) external view returns(uint256 _balances) {
    require(added[erc20Address], "NotSupported");
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
    whenNotPaused
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
    uint fee) external whenNotPaused onlyRouter  returns(bool) {
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
  ) external whenNotPaused onlyRouter returns(bool) {
   _setStatus(poolId, isAdmin, isMember);
   
    return true;
  }

  function _setStatus(
    uint poolId,
    bool isAdmin, 
    bool isMember
  ) private {
    subscriptionInfo[poolId].isAdmin = isAdmin;
    subscriptionInfo[poolId].isMember = isMember;
  }


  /**@dev Router updates balance in use. 
   * Note Callable only by the Mother branchup.
  */
  function updateBalancesInUse(address asset, uint value, bool reduce) 
    external 
    whenNotPaused 
    onlyRouter returns(bool) 
  {
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

  function approve(address erc20Address, uint amount)
    public
    whenNotPaused
    onlyOwner 
    isSupportedToken(erc20Address) {
      IERC20(erc20Address).approve(_router(), amount);
  }

  function updateTurnTime(uint poolId) external whenNotPaused returns(bool) {
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
  ) external whenNotPaused returns(bool) {
    subscriptionInfo[poolId] = info;
    if(lock) {
      _updateBalancesInUse(asset, value, reduceBalance);
    } else {
      _withdraw(asset, to, value, 0);
    }

    return true;
  }

  function clearSubscription(uint poolId) 
    external 
    whenNotPaused 
    onlyRouter returns(bool) {
      delete subscriptionInfo[poolId];
      return true;
  }

  function split(
    uint poolId,
    address asset,
    address[] memory members,
    address closeTo,
    uint unitAmount, 
    uint _balance) external whenNotPaused onlyRouter returns(bool) 
    {
      _setStatus(poolId, false, false);
      uint _bal = _balance;
      for(uint i = 0; i < members.length; i++) {
        _bal -= unitAmount;
        _withdraw(
          asset, 
          members[i], 
          unitAmount,
          0
        );
      }
      if(_bal > 0) _withdraw(  asset,   closeTo,   unitAmount,  0);

      return true;
  }


}