import { BaseRequest, BaseResponse } from "./Base";

class LinkCardRequest extends BaseRequest {
    cardIdentifier: string;
}

class LinkCardRespond extends BaseResponse {
    cardIdentifier: string;
}

export { LinkCardRequest, LinkCardRespond }