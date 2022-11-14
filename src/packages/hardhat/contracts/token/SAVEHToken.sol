//SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.4;

import "@ubeswap/governance/contracts/voting/TransferrableVotingToken.sol";

contract SAVEHToken is TransferrableVotingToken {
    /// @notice The maximum supply of PACT Tokens.
    uint96 public constant MAX_SUPPLY = 10_000_000_000e18;

    /**
     * @notice Construct a new PACT Token
     * Note: this contract doesn't specify an initial minter, so there is no way new
     * tokens can get created.
     * @param _initialOwner The initial account to grant all the tokens
     */
    constructor(address _initialOwner)
        TransferrableVotingToken("SavehToken", "SAVEH", 18, MAX_SUPPLY, _initialOwner)
    {}
}