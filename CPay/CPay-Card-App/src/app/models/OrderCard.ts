import { BaseRequest, BaseResponse } from "./Base";

class OrderCardRequest extends BaseRequest {
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
}

class OrderCardRespond extends BaseResponse {
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
}

export { OrderCardRequest, OrderCardRespond }