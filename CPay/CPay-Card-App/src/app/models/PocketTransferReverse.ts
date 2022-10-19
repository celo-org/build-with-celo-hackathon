import { BaseRequest, BaseResponse } from "./Base";

class PocketTransferReverseRequest extends BaseRequest {
    pocketTypeUUIDFrom: string;
    pocketTypeUUIDTo: string;
    requestAmount: number;
    referenceID: string;
    referenceDate: string;
}

class PocketTransferReverseRespond extends BaseResponse {
    pocketTypeUUIDFrom: string;
    pocketTypeUUIDTo: string;
    requestAmount: number;
}

export { PocketTransferReverseRequest, PocketTransferReverseRespond }