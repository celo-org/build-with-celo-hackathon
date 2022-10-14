// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract RequestPrice is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    uint256 public price;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    constructor() {
        setPublicChainlinkToken();
        oracle = 0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8;
        jobId = "d5270d1c311941d0b08bead21fea7747";
        fee = 0.1 * 10 ** 18; 
    }

    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data.
     */
    function requestPriceData() public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);


        // Set the URL to perform the GET request on
        request.add("get", "https://min-api.cryptocompare.com/data/generateAvg?fsym=BTC&tsym=USD&e=Kraken");

        // Specify the path for retrieving the data
        request.add("path", "RAW.PRICE");
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }

      /**
     * Callback Function
     */
    function fulfill(bytes32 _requestId, uint256 _price) public recordChainlinkFulfillment(_requestId)
    {
        price = _price;
    }
}