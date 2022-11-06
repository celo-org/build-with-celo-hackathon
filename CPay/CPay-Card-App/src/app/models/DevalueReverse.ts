import { BaseRequest, BaseResponse } from "./Base";

class DevalueReverseRequest extends BaseRequest {
    pocketUUID: string;
    requestAmount: string;
    referenceID: string;
    referenceDate: Date;
}

class DevalueReverseRespond extends BaseResponse {
    pocketUUID: string;
    requestAmount: string;
    referenceID: string;
}

export { DevalueReverseRequest, DevalueReverseRespond }