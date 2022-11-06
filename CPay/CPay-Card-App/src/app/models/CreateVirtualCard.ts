import { BaseRequest, BaseResponse } from "./Base";

class CreateVirtualCardRequest extends BaseRequest {
    cardLabel: string;
    notificationNumber: string;
    expiryDate: Date;
}

class CreateVirtualCardRespond extends BaseResponse {
    cardLabel: string;
    notificationNumber: string;
    cardNumber: string;
    ccv2: string;
    expiryDate: Date;
}

export { CreateVirtualCardRequest, CreateVirtualCardRespond }