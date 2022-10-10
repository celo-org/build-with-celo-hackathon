pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Run3Token is ERC20, Ownable {
    uint8 public constant DECIMALS = 18;
    uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(DECIMALS));
    uint256 public constant UNIT = 1 * (10 ** uint256(DECIMALS));

    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    constructor () ERC20("RUN3T", "RUN3T") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function mint(address recipient) public onlyOwner {
        _mint(recipient, UNIT);
    }
}
