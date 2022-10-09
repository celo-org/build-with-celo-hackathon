//SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.4;

import "@ubeswap/governance/contracts/voting/VotingToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IMintableToken.sol";

contract SSAVEHToken is IMintableToken, VotingToken, Ownable {
    /**
     * @notice Construct a Staking PACT Token
     */
    constructor() VotingToken("StakingSavehToken", "SSAVEH", 18) {}

    /**
     * @notice Mint new voting power
     * @param _account     The address of the destination account
     * @param _amount      The amount of voting power to be minted
     */
    function mint(address _account, uint96 _amount) external override onlyOwner {
        _mintVotes(_account, _amount);
    }

    /**
     * @notice Burn voting power
     * @param _account     The address of the source account
     * @param _amount      The amount of voting power to be burned
     */
    function burn(address _account, uint96 _amount) external override onlyOwner {
        _burnVotes(_account, _amount);
    }
}