// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

contract CeloDepositAndWithdrawUpgradeable is
    Initializable,
    PausableUpgradeable,
    AccessControlUpgradeable
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
    event CeloFundsWithdrawn(
        address indexed withdrawAddresscelo,
        uint256 amountWithdrawncelo
    );
    event UniqueTokenAdded(address indexed addedToken);
    event contractTokenBalanceAdjusted(address indexed token, uint256 amount);
    uint256 public celoBalance;
    address[] public allowedTokensAddresses;
    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");
    bytes32 public constant WITHDRAWER_ROLE = keccak256("WITHDRAWER_ROLE");
    mapping(address => uint256) public contractTokenBalances;
    mapping(address => bool) public tokenIsAllowed;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __Pausable_init();
        __AccessControl_init();
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(OWNER_ROLE, msg.sender);
        _grantRole(WITHDRAWER_ROLE, msg.sender);
    }

    function pause() public onlyRole(OWNER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(OWNER_ROLE) {
        _unpause();
    }

    receive() external payable {
        celoBalance += msg.value;
    }

    fallback() external payable {}

    function addAllowedToken(address _token) public onlyRole(OWNER_ROLE) {
        require(!tokenIsAllowed[_token], "token Already Exists");
        allowedTokensAddresses.push(_token);
        tokenIsAllowed[_token] = true;
        emit UniqueTokenAdded(_token);
    }

    function DepositCelo() public payable {
        require(msg.value > 0, "the amount should be greater than zero");
        celoBalance += msg.value;
    }

    function depositToken(address _token, uint256 _amount) public {
        require(_amount > 0, "the amount should be greater than zero");
        require(tokenIsAllowed[_token], "the token is not currently allowed");
        require(
            IERC20Upgradeable(_token).balanceOf(msg.sender) >= _amount,
            "you have insufficient Funds available in your wallet"
        );
        IERC20Upgradeable(_token).transferFrom(
            msg.sender,
            address(this),
            _amount
        );
        uint256 contractTokenBalance = contractTokenBalances[_token] += _amount;
        emit contractTokenBalanceAdjusted(_token, contractTokenBalance);
        emit FundsDeposited(_token, _amount);
    }

    function withdrawToken(
        address _withdrawerAddress,
        address _token,
        uint256 _amount
    ) public onlyRole(WITHDRAWER_ROLE) whenNotPaused {
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

    function withdrawCelo(address _withdrawerAddress, uint256 _amount)
        public
        payable
        onlyRole(WITHDRAWER_ROLE)
        whenNotPaused
    {
        require(_amount > 0, "Withdraw an amount greater than 0");
        require(
            celoBalance >= _amount,
            "insufficient celo available in the contract"
        );
        (bool success, ) = payable(_withdrawerAddress).call{value: _amount}("");
        require(success, "Failed to withdraw celo to address");
        celoBalance -= _amount;
        emit CeloFundsWithdrawn(_withdrawerAddress, _amount);
    }
}
