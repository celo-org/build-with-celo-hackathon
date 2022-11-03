// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@redstone-finance/evm-connector/contracts/data-services/MainDemoConsumerBase.sol";

contract ManualPayloadExample is MainDemoConsumerBase {
    function proxyRequestToBaseContract(bytes32 assetId)
        public
        view
        returns (uint256)
    {
        return getOracleNumericValueFromTxMsg(assetId);
    }

    /**
     * Returns the latest price of the give asset
     */
    function getLatestPrice(
        bytes calldata redstonePayload,
        bytes32 assetDataFeedId
    ) public view returns (uint256) {
        // Prepare call to RedStone base function
        bytes memory encodedFunction = abi.encodeWithSignature(
            "proxyRequestToBaseContract(bytes32)",
            assetDataFeedId
        );
        bytes memory encodedFunctionWithRedstonePayload = abi.encodePacked(
            encodedFunction,
            redstonePayload
        );

        // Securely getting oracle value
        (bool success, bytes memory result) = address(this).staticcall(
            encodedFunctionWithRedstonePayload
        );

        // Parsing response
        uint256 priceValue;
        if (!success) {
            assembly {
                revert(add(32, result), mload(result))
            }
        }
        assembly {
            priceValue := mload(add(result, 32))
        }

        return priceValue;
    }
}
