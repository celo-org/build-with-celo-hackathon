// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// address 0x5ea1BBb10Ba76723415ecbe73bC90687a496B31f
contract KDAI is ERC20 {

    constructor() ERC20("KDAI", "KDAI"){}

    function mint(uint amount) external {
        _mint(msg.sender, amount);
    }
}