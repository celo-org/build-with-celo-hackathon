// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.15;

contract SharedData {

    enum PaymentTrigger {
        FullPayment,
        Manual
    }

    struct InvoiceDetails {
        bytes32 name;
        string description;
        address targetToken;
        address recipientAddress;
        uint totalReceivable;
        SPayer[] payers;
    }

    struct SPayer {
        bytes payeruid;
        uint amountDue;
    }

}