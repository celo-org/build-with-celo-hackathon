// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./GidiFactory.sol";
import "./CommonWalletV1.sol";

contract WalletImplementation is CommonWalletV1 {
    modifier onlyOwner() {
        require(
            msg.sender == GidiFactory(gidiFactory).owner(),
            "WL: Unauthorized"
        );
        _;
    }

    function version() public pure returns (string memory) {
        return "v1.0.0";
    }

   
}
