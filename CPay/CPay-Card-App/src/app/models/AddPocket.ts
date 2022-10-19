import { BaseRequest, BaseResponse } from "./Base";

class AddPocketRequest extends BaseRequest {
    pocketUUID: string;
}

class AddPocketRespond extends BaseResponse {
    pocketUUID: string;
}

export { AddPocketRequest, AddPocketRespond }