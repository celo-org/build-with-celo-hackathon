pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Run3Token is ERC20, Ownable {
    uint8 public constant DECIMALS = 18;
    uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(DECIMALS));
    uint256 public constant MAX_SUPPLY = 3000000000 * (10 ** uint256(DECIMALS));


    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    constructor () ERC20("RUN3 Token", "RUN3T") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function mint(address recipient, uint256 amount) public onlyOwner {
        require((_totalSupply + amount) <= MAX_SUPPLY, "Max supply was reached");
        _mint(recipient, amount);
    }
}
