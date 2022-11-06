import { BaseRequest, BaseResponse } from "./Base";

class CreateVirtualCardWithLoadRequest extends BaseRequest {
    campaignUUID: string;
    cardLabel: string;
    notificationNumber: string;
    expiryDate: Date;
    requestAmount: number;
}

class CreateVirtualCardWithLoadRespond extends BaseResponse {
    campaignUUID: string;
    cardLabel: string;
    notificationNumber: string;
    cardNumber: string;
    cvv2: string;
    expiryDate: Date;
}

export { CreateVirtualCardWithLoadRequest, CreateVirtualCardWithLoadRespond }