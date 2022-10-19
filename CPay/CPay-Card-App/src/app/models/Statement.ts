import { BaseRequest, BaseResponse } from "./Base";

class StatementRequest extends BaseRequest {
    pocketUUID: string;
    startDate: Date;
    endDate: Date;
}

class StatementRespond extends BaseResponse {
    pocketUUID: string;
    balance: any [];
    TransactionType: string;
    statement: any [];
}

export { StatementRequest, StatementRespond }