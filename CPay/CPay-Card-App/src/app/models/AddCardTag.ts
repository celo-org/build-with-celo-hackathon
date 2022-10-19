import { BaseRequest, BaseResponse } from "./Base";

class AddCardTagRequest extends BaseRequest {
    tagName: string;
    tagValue: string;
}

class AddCardTagRespond extends BaseResponse { }

export {
    AddCardTagRequest, AddCardTagRespond
}