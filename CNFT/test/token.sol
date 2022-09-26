pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

/**
    @notice Token contract which can be used as payment without paying for gas, uses Permit for approve via signatures 

    @title Token
 */
contract Token is ERC20, ERC20Permit {
    constructor() ERC20Permit("Payment Token") ERC20("Payment Token", "PAY") {
        _mint(msg.sender, 500 * 10**18);
    }
}