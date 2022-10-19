import { BaseRequest, BaseResponse } from "./Base";

class ChangePinRequest extends BaseRequest {
    newPIN: string;
}

class ChangePinRespond extends BaseResponse {
    newPIN: string;
}

export { ChangePinRequest, ChangePinRespond }