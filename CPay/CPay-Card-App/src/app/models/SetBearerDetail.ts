import { BaseRequest, BaseResponse } from "./Base";

class SetBearerDetailRequest extends BaseRequest {
    prefix: string;
    firstName: string;
    middleName: string;
    lastName: string;
    idNumber: string;
    mobilePhoneArea: string;
    mobilePhoneNumber: string;
    countryOfCitizenship: string;
    dateOfBirth: string;
    screeningRequested: number;
    image: string;
}

class SetBearerDetailRespond extends BaseResponse {

}

export { SetBearerDetailRequest, SetBearerDetailRespond }