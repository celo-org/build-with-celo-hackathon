// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.8.0;

import "github.com/provable-things/ethereum-api/provableAPI.sol";

contract EthPrice is usingProvable {

    uint public ethPriceUSD;

    event LogConstructorInitiated(string nextStep);
    event LogNewEthPrice(string price);
    event LogNewProvableQuery(string description);

    constructor() public {
        emit LogConstructorInitiated("Constructor is initiated and 'updateEthPrice()' is called to send the Provable Query.");
        updateEthPrice(); // First check at contract creation...
    }

    function __callback(bytes32 _myid, string memory _result) public {
        require(msg.sender == provable_cbAddress());
        emit LogNewEthPrice(_result);
        ethPriceUSD = parseInt(_result); 
        // Now do something with the USD Diesel price...
    }

    function updateEthPrice() public payable {
        emit LogNewProvableQuery("Provable query was sent, standing by for the answer...");
        provable_query("URL", "json(https://api.pro.coinbase.com/products/ETH-USD/ticker).price");
    }
}