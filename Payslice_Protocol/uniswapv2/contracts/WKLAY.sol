// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// address 0x59a0CE568Bee019ABD369CC9d199E6617f462F4A
contract WKLAY is ERC20 {

    constructor() ERC20("Wrapped Klay", "WKLAY"){}

    function mint(uint amount) external {
        _mint(msg.sender, amount);
    }
}