import { BaseRequest, BaseResponse } from "./Base";

class DevalueRequest extends BaseRequest {
    pocketUUID: string;
    requestAmount: string;
}

class DevalueRespond extends BaseResponse {
    pocketUUID: string;
    requestAmount: string;
    balance: any [];
    authorisationID: string;
}

export { DevalueRequest, DevalueRespond }