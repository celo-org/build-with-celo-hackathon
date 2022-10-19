class BaseRequest {
    terminalID: string;
    customerReference: string;
    trackingNumber: string;
    transactionID: string;
    transactionDate: Date;
    checksum: string;
}

class BaseResponse {
    terminalID: string;
    customerReference: string;
    trackingNumber: string;
    clientTransactionID: string;
    serverTransactionID: string;
    resultCode: number;
    resultText: string;
}

export { BaseRequest, BaseResponse }