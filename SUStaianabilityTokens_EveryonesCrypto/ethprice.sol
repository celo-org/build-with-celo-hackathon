// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract EthPrice {

     AggregatorV3Interface internal ethFeed;

     // Precomputing hash of strings
       bytes32 ethHash = keccak256(abi.encodePacked("ETH"));

    /**
     * Network: Kovan
        0x9326BFA02ADD2366b30bacB125260Af641031331
     * Address: 0x169e633a2d1e6c10dd91238ba11c4a708dfef37c
     */
    constructor() {
        ethFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * Returns the latest price
     */
    function getEthPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = ethFeed.latestRoundData();
        return price;
    }

}