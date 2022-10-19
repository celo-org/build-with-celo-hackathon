import { BaseRequest, BaseResponse } from "./Base";

class DeductFundsRequest extends BaseRequest {
    pocketUUID: string;
    requestAmount: string;
}

class DeductFundsRespond extends BaseResponse {
    pocketUUID: string;
    requestAmount: string;
    balance: any [];
}

export { DeductFundsRequest, DeductFundsRespond }