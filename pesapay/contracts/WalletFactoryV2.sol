// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./WalletFactory.sol";

contract WalletFactoryV2 is WalletFactory {
    function version() public pure returns (string memory) {
        return "V2";
    }
}
