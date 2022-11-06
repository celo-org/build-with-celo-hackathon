import { BaseRequest, BaseResponse } from "./Base";

class UpdateCVVRequest extends BaseRequest {
    reference: string;
    cardIdentifier: string;
}

class UpdateCVVRespond extends BaseResponse {

}

export { UpdateCVVRequest, UpdateCVVRespond }