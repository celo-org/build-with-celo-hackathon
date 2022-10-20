// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "./WalletProxy.sol";
import "./EscrowProxy.sol";
import "hardhat/console.sol";

contract WalletFactory is
    Initializable,
    OwnableUpgradeable,
    PausableUpgradeable,
    UUPSUpgradeable
{
    address public walletImplementation;
    address public escrowWalletImplementation;

    mapping(string => address) public wallets;

    event NewWallet(string uuid, address indexed wallet);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address _walletImp) public initializer {
        __Ownable_init();
        __Pausable_init();
        walletImplementation = _walletImp;
    }

    function updateImplementation(address _walletImp)
        public
        onlyOwner
        whenPaused
    {
        walletImplementation = _walletImp;
    }

    function updateEscrow(address _escrowWalletImp)
        public
        onlyOwner
        whenPaused
    {
        escrowWalletImplementation = _escrowWalletImp;
    }

    function newWallet(string memory userId) public returns (bool) {
        require(wallets[userId] == address(0), "WI: Already has Wallet");
        require(bytes(userId).length >= 32, "WI: Invalid ID"); //If the passed string is ASCII character i.e 1 byte/character

        address _wallet = address(new WalletProxy(address(this)));

        wallets[userId] = _wallet;

        emit NewWallet(userId, _wallet);

        return true;
    }

    function createEscrow(string memory userId) public returns (bool) {
        require(wallets[userId] == address(0), "WI: Already has Wallet");
        require(bytes(userId).length >= 32, "WI: Invalid ID"); //If the passed string is ASCII character i.e 1 byte/character

        address _wallet = address(new EscrowProxy(address(this)));

        wallets[userId] = _wallet;

        emit NewWallet(userId, _wallet);

        return true;
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}
}
