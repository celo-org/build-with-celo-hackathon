import { BaseRequest, BaseResponse } from "./Base";

class TransferTokenRequest extends BaseRequest {
    tokenUniqueReference: string;
    oldCardIdentifier: string;
    newCardIdentifier: string;
}

class TransferTokenRespond extends BaseResponse {

}

export { TransferTokenRequest, TransferTokenRespond }