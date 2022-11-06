import { BaseRequest, BaseResponse } from "./Base";

class LoadFundsRequest extends BaseRequest {
    pocketUUID: string;
    requestAmount: number;
}

class LoadFundsRespond extends BaseResponse {
    pocketUUID: string;
    requestAmount: number;
    balance: any [];
}

export { LoadFundsRequest, LoadFundsRespond }