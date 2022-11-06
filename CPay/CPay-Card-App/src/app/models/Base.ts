import { XmlSerializerService } from "../serializer/xml-serializer.service";

class BaseRequest {
    serialize() : string {
        return XmlSerializerService.serialize(this, "CreateVirtualCard");
    }
    /*terminalID: string;
    customerReference: string;
    trackingNumber: string;
    transactionID: string;
    transactionDate: Date;
    checksum: number;*/
}

class BaseResponse {
    deserialize() : BaseResponse {
        return XmlSerializerService.deserialize(this);
    }
    /*terminalID: string;
    customerReference: string;
    trackingNumber: string;
    clientTransactionID: string;
    serverTransactionID: string;
    resultCode: number;
    resultText: string;*/
}

export { BaseRequest, BaseResponse }