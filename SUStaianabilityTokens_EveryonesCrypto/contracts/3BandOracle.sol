// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

interface IStdReference {
    /// A structure returned whenever someone requests for standard reference data.
    struct ReferenceData {
        uint256 rate; // base/quote exchange rate, multiplied by 1e18.
        uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
        uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
    }

    /// Returns the price data for the given base/quote pair. Revert if not available.
    function getReferenceData(string memory _base, string memory _quote)
        external
        view
        returns (ReferenceData memory);

    /// Similar to getReferenceData, but with multiple base/quote pairs at once.
    function getReferenceDataBulk(string[] memory _bases, string[] memory _quotes)
        external
        view
        returns (ReferenceData[] memory);
}

contract BandOracle {
    IStdReference ref;
    uint flag = 1;

    uint256 public price;

    constructor(IStdReference _ref) {
        ref = _ref;
    }

    function getPrice() external view returns (uint256){
        IStdReference.ReferenceData memory data = ref.getReferenceData("CELO","USD");
        if(flag == 1)
            return data.rate;
        else 
            return 0;
    }

    function flipFlag() external {
        if(flag == 0)
            flag = 1;
        else
            flag = 0;
    }

    function getMultiPrices() external view returns (uint256[] memory){
        string[] memory baseSymbols = new string[](2);
        baseSymbols[0] = "CELO";
        baseSymbols[1] = "CELO";

        string[] memory quoteSymbols = new string[](2);
        quoteSymbols[0] = "USD";
        quoteSymbols[1] = "ETH";
        IStdReference.ReferenceData[] memory data = ref.getReferenceDataBulk(baseSymbols,quoteSymbols);

        uint256[] memory prices = new uint256[](2);
        prices[0] = data[0].rate;
        prices[1] = data[1].rate;

        return prices;
    }

    function savePrice(string memory base, string memory quote) external {
        IStdReference.ReferenceData memory data = ref.getReferenceData(base,quote);
        price = data.rate;
    }
}
