// SPDX-License-Identifier: MIT

pragma solidity ^0.8.14;

import "@openzeppelin/contracts/access/Ownable.sol";


struct Payer{
    bytes32 uid,
    uint amountDue
}

struct InvoiceData {
    address _targetToken,
    address _recipientAddress,
    uint _totalReceivable,
    bytes32 _invoiceuid,
    string memory _title,
    string memory _description,
    Payer[] memory _payers
}

contract PaysliceProtocol is Ownable{

    
    event InvoiceCreated(address proxy, address creator, bytes32 invoiceId);

    /// @dev creates a new invoice for `msg.sender`
    /// @param `_invoiceData` details of the invoice
    function createInvoice(
        InvoiceData memory _invoiceData
    ) external {
        //TODO: create invoice via a proxy
    }

}

