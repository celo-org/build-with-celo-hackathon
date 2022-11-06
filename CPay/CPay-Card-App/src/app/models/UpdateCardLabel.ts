import { BaseRequest, BaseResponse } from "./Base";

class UpdateCardLabelRequest extends BaseRequest {
    cardLabel: string;
}

class UpdateCardLabelRespond extends BaseResponse {

}

export { UpdateCardLabelRequest, UpdateCardLabelRespond }