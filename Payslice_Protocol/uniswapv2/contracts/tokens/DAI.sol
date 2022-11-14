// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

/**
 * @author Nartey Kodjo-Sarso <narteysarso@gmail.com>
 * @notice This token is for testing purposes only and has no real world value.
 *          It does not in anyway represents any other token with similar naming for that matter.
 */


/// @custom:security-contact narteysarso@gmail.com
contract DAI is ERC20, Ownable, ERC20Permit {
    constructor() ERC20("DAI", "DAI") ERC20Permit("DAI") {
         _mint(msg.sender, 10000000000 ether);
    }

    function mint(uint256 amount) public onlyOwner {
        _mint(msg.sender, amount);
    }
}