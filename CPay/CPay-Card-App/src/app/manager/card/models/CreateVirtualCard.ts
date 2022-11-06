import { BaseRequest, BaseResponse } from "src/app/models/Base";

class CreateVirtualCardRequest extends BaseRequest {

    terminalID: string;
    campaignUUID: string;
    customerReference: string;
    cardLabel: string;
    notificationNumber: string;
    expiryDate: Date;
    transactionID: string;
    transactionDate: Date;
    checksum: string;

    constructor() {
        super();
    }
}

class CreateVirtualCardResponse extends BaseResponse {
    customerReference: string;
    resultText: string;
    serverTransactionID: string;
    expiryDate: Date;
    cardLabel: string;
    clientTransactionID: string;
    cvv2: string;
    resultCode: number;
    terminalID: string;
    cardNumber: string;
    campaignUUID: string;
    notificationNumber: string;
    trackingNumber: string;
}

export {
    CreateVirtualCardRequest, CreateVirtualCardResponse
}