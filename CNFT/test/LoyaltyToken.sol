pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "./Token.sol";

/**
    @notice token contract which will act as the rewards for the program.
    @title LoyaltyToken
 */
contract LoyaltyToken is ERC20 {
    address loyaltyProgram;

    constructor() ERC20("Loyalty Token", "LOYAL") {
        loyaltyProgram = msg.sender;
    }

    modifier onlyProgram() {
        require(
            msg.sender == loyaltyProgram,
            "Only Loyalty Program contract can reward users"
        );
        _;
    }

    /**
        @notice function that rewards the user by minting more reward tokens
        @param user the address of user to be rewarded
        @param amount the amount of the reward tokens to be minted
     */
    function rewardUser(address user, uint256 amount) external onlyProgram {
        _mint(user, amount);
        emit Rewarded(user, amount);
    }

    event Rewarded(address indexed user, uint256 indexed amount);
}