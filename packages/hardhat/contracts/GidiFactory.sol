// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./WalletProxy.sol";
import "hardhat/console.sol";

contract GidiFactory is
    Initializable,
    OwnableUpgradeable,
    PausableUpgradeable
{
    address public walletImp;

    mapping(string => address) public wallets;

    event NewWallet(string uuid, address indexed wallet);

    function initialize(address _walletImp) public initializer {
        __Ownable_init();
        __Pausable_init();

        walletImp = _walletImp;
    }

    function updateWalletImplementation(address _walletImp)
        public
        onlyOwner
        whenPaused
    {
        walletImp = _walletImp;
    }

    function newWallet(string memory userId) public returns (bool) {
        require(bytes(userId).length >= 32, "GF: Invalid ID"); //If the passed string is ASCII character i.e 1 byte/character

        address _wallet = address(new WalletProxy(address(this)));

        wallets[userId] = _wallet;

        emit NewWallet(userId, _wallet);

        return true;
    }
}
