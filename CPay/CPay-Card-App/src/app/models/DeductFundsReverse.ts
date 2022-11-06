import { BaseRequest, BaseResponse } from "./Base";

class DeductFundsReverseRequest extends BaseRequest {
    pocketUUID: string;
    requestAmount: string;
    referenceID: string;
    referenceDate: Date;
}

class DeductFundsReverseRespond extends BaseResponse {
    pocketUUID: string;
    requestAmount: string;
    referenceID: string;
}

export { DeductFundsReverseRequest, DeductFundsReverseRespond }