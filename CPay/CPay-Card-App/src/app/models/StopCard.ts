import { BaseRequest, BaseResponse } from "./Base";

class StopCardRequest extends BaseRequest {
    stopReasonID: number;
}

class StopCardRespond extends BaseResponse {
    stopReasonID: number;
}

export { StopCardRequest, StopCardRespond }