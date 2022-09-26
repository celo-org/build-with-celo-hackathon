//SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface SUSTokenFactory {
    function sendSUST(string memory, address) external view;
}

contract FrontFace {
    address private tokenFactoryAddress;
    
    constructor(address _tokenFactoryAddress) {
        tokenFactoryAddress = _tokenFactoryAddress;
    }



//----------------------- SET ADDRESS FUNCTIONS -----------------------//
    function setTokenFactoryAddress(address _tokenFactoryAddress) public {
        require(_tokenFactoryAddress != address(0), "Account: Zero or Invalid address!");
        tokenFactoryAddress = _tokenFactoryAddress;
    }

    function sendReceipt(string memory receiptNum, address pubKey) public view {
        //require(receiptNum != 0, "Input Error: Receipt number is zero or invalid!");
        require(pubKey != address(0), "Input Error: Recepient address is zero or invalid!");
        SUSTokenFactory(tokenFactoryAddress).sendSUST(receiptNum, pubKey);
    }
}
