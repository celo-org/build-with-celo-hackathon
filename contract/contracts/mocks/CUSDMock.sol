// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CUSDMock is ERC20 {
    constructor() public ERC20("CUSD", "CUSD") {
        _mint(msg.sender, 1000);
    }
}