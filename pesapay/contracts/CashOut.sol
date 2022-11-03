pragma solidity ^0.8.7;
// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/metatx/MinimalForwarder.sol";
import "./Redstone.sol";

contract CashOut is ManualPayloadExample, ERC2771Context, Pausable, Ownable {
    event TokenFundsDeposited(
        address indexed tokenDeposited,
        address indexed addressDeposited,
        uint256 amountDeposited
    );
    event TokenFundsWithdrawn(
        address indexed tokenWithdrawn,
        address indexed withdrawAddress,
        uint256 amountWithdrawn
    );
    event FundsWithdrawn(
        address indexed withdrawAddressNative,
        uint256 amountWithdrawnNative
    );
    event UniqueTokenAdded(address indexed addedToken);
    event contractTokenBalanceAdjusted(address indexed token, uint256 amount);
    uint256 minimumPrice = 10; //USD
    address[] public allowedTokensAddresses;
    mapping(address => uint256) public contractTokenBalances;
    mapping(address => bool) public tokenIsAllowed;

    constructor(
        MinimalForwarder forwarder // Initialize trusted forwarder
    ) ERC2771Context(address(forwarder)) {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    receive() external payable {}

    fallback() external payable {}

    function setMinimumPrice(uint256 _amount) public onlyOwner {
        minimumPrice = _amount;
    }

    function lowestCashoutAmount(
        bytes calldata redstonePayload,
        bytes32 assetDataFeedId
    ) public view returns (uint256) {
        uint256 cusdPrice = getLatestPrice(redstonePayload, assetDataFeedId);
        uint256 minPrice = (minimumPrice * 1e26) / cusdPrice;
        return minPrice;
    }

    function addAllowedToken(address _token) public onlyOwner {
        require(!tokenIsAllowed[_token], "token Already Exists");
        allowedTokensAddresses.push(_token);
        tokenIsAllowed[_token] = true;
        emit UniqueTokenAdded(_token);
    }

    function depositToken(
        address _token,
        uint256 _amount,
        bytes calldata redstonePayload,
        bytes32 assetDataFeedId
    ) public {
        require(
            _amount >= lowestCashoutAmount(redstonePayload, assetDataFeedId),
            "amount less than lowest cash amount"
        );
        require(tokenIsAllowed[_token], "the token is not currently allowed");
        IERC20(_token).transferFrom(_msgSender(), address(this), _amount);
        uint256 contractTokenBalance = contractTokenBalances[_token] += _amount;
        emit contractTokenBalanceAdjusted(_token, contractTokenBalance);
        emit TokenFundsDeposited(_token, _msgSender(), _amount);
    }

    function withdrawToken(
        address _withdrawerAddress,
        address _token,
        uint256 _amount
    ) public onlyOwner whenNotPaused {
        require(_amount > 0, "Withdraw an amount greater than 0");
        require(tokenIsAllowed[_token], "the token is currently not allowed");
        require(
            IERC20(_token).balanceOf(address(this)) >= _amount,
            "insufficient tokens available in the contract"
        );
        IERC20(_token).transfer(_withdrawerAddress, _amount);
        uint256 contractTokenBalance = contractTokenBalances[_token] -= _amount;
        emit contractTokenBalanceAdjusted(_token, contractTokenBalance);
        emit TokenFundsWithdrawn(_token, _withdrawerAddress, _amount);
    }

    function withdrawCoin(address _withdrawerAddress)
        public
        payable
        onlyOwner
        whenNotPaused
    {
        uint256 _amount = address(this).balance;
        (bool success, ) = payable(_withdrawerAddress).call{value: _amount}("");
        require(success, "Failed to withdraw coin to address");
        emit FundsWithdrawn(_withdrawerAddress, _amount);
    }

    function _msgSender()
        internal
        view
        virtual
        override(Context, ERC2771Context)
        returns (address sender)
    {
        return ERC2771Context._msgSender();
    }

    function _msgData()
        internal
        view
        virtual
        override(Context, ERC2771Context)
        returns (bytes calldata)
    {
        return ERC2771Context._msgData();
    }
}
