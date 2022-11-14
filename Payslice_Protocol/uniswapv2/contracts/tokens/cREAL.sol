// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @author Nartey Kodjo-Sarso <narteysarso@gmail.com>
 * @notice This token is for testing purposes only and has no real world value.
 *          It does not in anyway represents any other token with similar naming for that matter.
 */
contract cREAL is ERC20 {

    constructor() ERC20("Celo REAL", "cREAL"){}

    function mint(uint amount) external {
        _mint(msg.sender, amount);
    }
}