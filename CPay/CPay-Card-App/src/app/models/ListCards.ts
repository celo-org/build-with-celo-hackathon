import { BaseRequest, BaseResponse } from "./Base";

class ListCardsRequest extends BaseRequest {

}

class ListCardsRespond extends BaseResponse {
    Cards: any [];
}

export { ListCardsRequest, ListCardsRespond }