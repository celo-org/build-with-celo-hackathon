import { BaseRequest, BaseResponse } from "./Base";

class LoadFundsReverseRequest extends BaseRequest {
    pocketUUID: string;
    requestAmount: number;
    referenceID: string;
    referenceDate: Date;
}

class LoadFundsReverseRespond extends BaseResponse {
    pocketUUID: string;
    requestAmount: number;
    referenceID: string;
}

export { LoadFundsReverseRequest, LoadFundsReverseRespond }