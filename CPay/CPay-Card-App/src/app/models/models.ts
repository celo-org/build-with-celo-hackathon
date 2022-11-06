class VirtualCard {
    PAN: string;
    CVV: number;
    EXP: Date;
}

class TransactionHistory {
    Description: string;
    Amount: string;
    Date: Date;
}

class CreateVirtualCardRequestData {
    terminalID: string;
    campaignUUID: string;
    customerReference: string;
    cardLabel: string;
    notificationNumber: string;
    expiryDate: Date;
    transactionID: string;
    transactionDate: Date;
    checksum: string;
}

class CreateVirtualCardRespondData {
    terminalID: string;
    campaignUUID: string;
    customerReference: string;
    cardLabel: string;
    notificationNumber: string;
    trackingNumber: string;
    cardNumber: string;
    cvv2: string;
    expiryDate: Date;
    clientTransactionID: string;
    serverTransactionID: Date;
    resultCode: number;
    resultText: string;
}

export {
    VirtualCard, TransactionHistory
}