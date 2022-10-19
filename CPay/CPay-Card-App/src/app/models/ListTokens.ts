import { BaseRequest, BaseResponse } from "./Base";
import { Token } from "./Token";

class ListTokenRequest extends BaseRequest {

}

class ListTokenRespond extends BaseResponse {
    tokens: Token [];
}

export { ListTokenRequest, ListTokenRespond }