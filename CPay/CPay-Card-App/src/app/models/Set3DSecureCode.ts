import { BaseRequest, BaseResponse } from "./Base";

class Set3DSecureCodeCardRequest extends BaseRequest {
    code: string;
}

class Set3DSecureCodeRespond extends BaseResponse {
    code: string;
}

export { Set3DSecureCodeCardRequest, Set3DSecureCodeRespond }