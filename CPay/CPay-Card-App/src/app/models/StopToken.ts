import { BaseRequest, BaseResponse } from "./Base";

class StopTokenRequest extends BaseRequest {
    cardIdentifier: string;
    tokenUniqueReference: string;
    stopReasonID: number;
    comment: string;
}

class StopTokenRespond extends BaseResponse {

}

export { StopTokenRequest, StopTokenRespond }