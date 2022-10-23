// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/metatx/MinimalForwarderUpgradeable.sol";
import "./ERC2771ContextUpgradeable.sol";

contract Vault is
    Initializable,
    PausableUpgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable,
    ERC2771ContextUpgradeable
{
    event FundsDeposited(
        address indexed tokenDeposited,
        uint256 amountDeposited
    );
    event TokenFundsWithdrawn(
        address indexed tokenWithdrawn,
        address indexed withdrawAddress,
        uint256 amountWithdrawn
    );
    event CoinFundsWithdrawn(
        address indexed withdrawAddresscoin,
        uint256 amountWithdrawncoin
    );
    event UniqueTokenAdded(address indexed addedToken);
    event contractTokenBalanceAdjusted(address indexed token, uint256 amount);
    uint256 public coinBalance;
    address[] public allowedTokensAddresses;
    mapping(address => uint256) public contractTokenBalances;
    mapping(address => bool) public tokenIsAllowed;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address forwarder) public initializer {
        __Pausable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();
        __ERC2771ContextUpgradeable_init(forwarder);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    receive() external payable {
        coinBalance += msg.value;
    }

    fallback() external payable {}

    function addAllowedToken(address _token) public onlyOwner {
        require(!tokenIsAllowed[_token], "token Already Exists");
        allowedTokensAddresses.push(_token);
        tokenIsAllowed[_token] = true;
        emit UniqueTokenAdded(_token);
    }

    function depositCoin() public payable {
        require(msg.value > 0, "the amount should be greater than zero");
        coinBalance += msg.value;
    }

    function depositToken(address _token, uint256 _amount) public {
        require(tokenIsAllowed[_token], "the token is not currently allowed");
        address caller = _msgSender();
        require(
            IERC20Upgradeable(_token).balanceOf(caller) >= _amount,
            "you have insufficient Funds available in your wallet"
        );
        IERC20Upgradeable(_token).transferFrom(caller, address(this), _amount);
        uint256 contractTokenBalance = contractTokenBalances[_token] += _amount;
        emit contractTokenBalanceAdjusted(_token, contractTokenBalance);
        emit FundsDeposited(_token, _amount);
    }

    function withdrawToken(
        address _token,
        address _withdrawerAddress,
        uint256 _amount
    ) public onlyOwner whenNotPaused {
        require(_amount > 0, "Withdraw an amount greater than 0");
        require(tokenIsAllowed[_token], "the token is currently not allowed");
        require(
            IERC20Upgradeable(_token).balanceOf(address(this)) >= _amount,
            "insufficient tokens available in the contract"
        );
        IERC20Upgradeable(_token).transfer(_withdrawerAddress, _amount);
        uint256 contractTokenBalance = contractTokenBalances[_token] -= _amount;
        emit contractTokenBalanceAdjusted(_token, contractTokenBalance);
        emit TokenFundsWithdrawn(_token, _withdrawerAddress, _amount);
    }

    function withdrawCoin(address _withdrawerAddress, uint256 _amount)
        public
        payable
        onlyOwner
        whenNotPaused
    {
        require(_amount > 0, "Withdraw an amount greater than 0");
        require(
            coinBalance >= _amount,
            "insufficient coins available in the contract"
        );
        (bool success, ) = payable(_withdrawerAddress).call{value: _amount}("");
        require(success, "Failed to withdraw coins to address");
        coinBalance -= _amount;

        emit CoinFundsWithdrawn(_withdrawerAddress, _amount);
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    // The following functions are overrides required by Solidity.

    function _msgSender()
        internal
        view
        virtual
        override(ContextUpgradeable, ERC2771ContextUpgradeable)
        returns (address sender)
    {
        return ERC2771ContextUpgradeable._msgSender();
    }

    function _msgData()
        internal
        view
        virtual
        override(ContextUpgradeable, ERC2771ContextUpgradeable)
        returns (bytes calldata)
    {
        return ERC2771ContextUpgradeable._msgData();
    }
}
