import { BaseRequest, BaseResponse } from "./Base";

class OrderCardWithPinBlockRequest extends BaseRequest {
    campaignUUID: string;
    title: string;
    initials: string;
    lastName: string;
    Address1: string;
    Address2: string;
    Address3: string;
    Address4: string;
    Address5: string;
    additionalData: string;
    pinBlock
}

class OrderCardWithPinBlockRespond extends BaseResponse {
    campaignUUID: string;
    title: string;
    initials: string;
    lastName: string;
    Address1: string;
    Address2: string;
    Address3: string;
    Address4: string;
    Address5: string;
    additionalData: string;
    pinBlock
}

export { OrderCardWithPinBlockRequest, OrderCardWithPinBlockRespond }