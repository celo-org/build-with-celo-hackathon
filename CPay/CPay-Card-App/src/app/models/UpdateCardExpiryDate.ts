import { BaseRequest, BaseResponse } from "./Base";

class UpdateCardExpiryDateRequest extends BaseRequest {
    expiryDate: Date;
}

class UpdateCardExpiryDateRespond extends BaseResponse {

}

export { UpdateCardExpiryDateRequest, UpdateCardExpiryDateRespond }