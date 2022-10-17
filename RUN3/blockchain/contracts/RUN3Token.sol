pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Run3Token is ERC20, Ownable {
    uint8 public constant DECIMALS = 18;
    uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(DECIMALS));
    uint256 public constant MAX_SUPPLY = 3000000000 * (10 ** uint256(DECIMALS));
    address creator;
    address watchAddress;

    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    constructor () ERC20("RUN3 Token", "RUN3T") {
        creator = msg.sender;
        _mint(msg.sender, INITIAL_SUPPLY);
    }
    
    modifier onlyAllowed() {
        require(msg.sender == creator || msg.sender == watchAddress, "Not allowed"); // If it is incorrect here, it reverts.
        _;                              // Otherwise, it continues.
    }

    modifier maxSupplyWasReched (uint256 amount) {
        require((totalSupply() + amount) >= MAX_SUPPLY, "Max supply was reached");
        _;
    }

    function updateWatchAddress(address recipient) public onlyOwner {
        watchAddress = recipient;
    }

    function mintRun3T(address recipient, uint256 amount) public onlyAllowed maxSupplyWasReched(amount) {
        _mint(recipient, amount);
    }
}
