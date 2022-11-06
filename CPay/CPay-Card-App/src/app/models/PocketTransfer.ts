import { BaseRequest, BaseResponse } from "./Base";

class PocketTransferRequest extends BaseRequest {
    pocketTypeUUIDFrom: string;
    pocketTypeUUIDTo: string;
    requestAmount: number;
}

class PocketTransferRespond extends BaseResponse {
    pocketTypeUUIDFrom: string;
    pocketTypeUUIDTo: string;
    requestAmount: number;
    balance: any [];
    authNumber: string;
    expiryDate: Date;
}

export { PocketTransferRequest, PocketTransferRespond }