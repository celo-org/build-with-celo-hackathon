import { BaseRequest, BaseResponse } from "./Base";

class TransferFundsRequest extends BaseRequest {
    trackingNumberFrom: string;
    trackingNumberTo: string;
    pocketUUID: string;
    requestAmount: number;
}

class TransferFundsRespond extends BaseResponse {
    trackingNumberFrom: string;
    trackingNumberTo: string;
    pocketUUID: string;
    requestAmount: number;
    balance: any [];
}

export { TransferFundsRequest, TransferFundsRespond }