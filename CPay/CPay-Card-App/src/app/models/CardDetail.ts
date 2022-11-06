import { BaseRequest, BaseResponse } from "./Base";

class CardDetailRequest extends BaseRequest {

}

class CardDetailRespond extends BaseResponse {
    campaignUUID: string;
    cardLabel: string;
    cardNumber: string;
    cvv2: string;
    expiryDate: Date;
    balance: any [];
    currency: string;
    stooped: string;
}

export { CardDetailRequest, CardDetailRespond }