import { BaseRequest, BaseResponse } from "./Base";

class InsertTransactionFeeRequest extends BaseRequest {
    pocketUUID: string;
    feeTypeID: string;
    requestAmount: string;
}

class InsertTransactionFeeRespond extends BaseResponse {
    pocketUUID: string;
    feeTypeID: string;
    requestAmount: string;
    balance: any []
}

export { InsertTransactionFeeRequest, InsertTransactionFeeRespond }