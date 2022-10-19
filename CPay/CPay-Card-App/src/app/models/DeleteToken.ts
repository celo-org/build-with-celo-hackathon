import { BaseRequest, BaseResponse } from "./Base";

class DeleteTokenRequest extends BaseRequest {
    tokenUniqueReference: string;
    stopReasonID: string;
    comment: string;
}

class DeleteTokenRespond extends BaseResponse {
    tokenUniqueReference: string;
}

export { DeleteTokenRequest, DeleteTokenRespond }