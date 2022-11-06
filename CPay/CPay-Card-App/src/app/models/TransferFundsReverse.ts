import { BaseRequest, BaseResponse } from "./Base";

class TransferFundsReverseRequest extends BaseRequest {
    trackingNumberFrom: string;
    trackingNumberTo: string;
    pocketUUID: string;
    requestAmount: number;
    referenceID: string;
    referenceDate: Date;
}

class TransferFundsReverseRespond extends BaseResponse {
    trackingNumberFrom: string;
    trackingNumberTo: string;
    pocketUUID: string;
    requestAmount: number;
    referenceID: string;
    referenceDate: Date;
}

export { TransferFundsReverseRequest, TransferFundsReverseRespond }