import { BaseRequest, BaseResponse } from "./Base";

class BearerDetailRequest extends BaseRequest {
}

class BearerDetailRespond extends BaseResponse {
    prefix: string;
    firstName: string;
    middleName: string;
    lastName: string;
    idNumber: string;
    mobilePhoneArea: string;
    mobilePhoneNumber: string;
    screeningRequested: number;
    screeningResultCode: number;
    screeningResultText: string;
    image: string;
}

export { BearerDetailRequest, BearerDetailRespond }