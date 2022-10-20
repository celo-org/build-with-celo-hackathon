// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// address: 0xF723633155Ed55C471d17a0516CCcC36102E5429
contract oUSDC is ERC20 {

    constructor() ERC20("oUSDC", "oUSDC"){}

    function mint(uint amount) external {
        _mint(msg.sender, amount);
    }
}