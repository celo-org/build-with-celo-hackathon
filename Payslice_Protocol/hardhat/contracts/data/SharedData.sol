// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.15;

    enum PaymentTrigger {
        FullPayment,
        Manual
    }

    struct SliceDetails {
        string title;
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

