//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./proxiable.sol";

contract Succour is Proxiable{
    address public owner;


    function constructor1() public {
        require(owner == address(0), "Already initalized");
        owner = msg.sender;
    }


    function updateCode(address newCode) onlyOwner public {
        updateCodeAddress(newCode);
    }


    function encode() external pure returns (bytes memory) {
        return abi.encodeWithSignature("constructor1()");
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner is allowed to perform this action");
        _;
    }
}