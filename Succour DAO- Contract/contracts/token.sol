// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Erc20Token is ERC20("Succour", "SUR") {
    constructor () {
        _mint(0x85f20a6924A61904AB44243C7e2c771B3bE46734, 1000000000e18);
    } 
}