import { Injectable } from '@angular/core';
import { BaseRequest, BaseResponse } from '../models/Base';

@Injectable({
  providedIn: 'root'
})
export class XmlSerializerService {

  methodCallOpen: "<methodCall>\n";
  methodNameOpen: "<methodName>\n";
  paramsOpen: "<params>\n";
  paramOpen: "<param>\n";
  valueOpen: "<value>\n";

  methodCallClose: "</methodCall>\n";
  methodNameClose: "</methodName>\n";
  paramsClose: "</params>\n";
  paramClose: "</param>\n";
  valueClose: "</value>\n";

  constructor() { }

  static serialize(request: BaseRequest, method: string): string {
    let properties = Object.getOwnPropertyNames(request);

    let output = "<methodCall>\n";
    output += `<methodName type="xs:string">${method}</methodName>\n`;
    output += "<params>\n";

    properties.forEach(property => {
      output += "<param>\n";
      output += "<value>\n";

      switch (typeof(request[property])) {
        case typeof(1):
          output += "<number>" + request[property] + "</number>\n";
          break;
        case typeof('string'):
          output += "<string>" + request[property] + "</string>\n";
          break;
        case typeof(new Date()):
          output += "<dateTime.iso8601>" + (request[property] as Date).toString() + "</dateTime.iso8601>\n";
          break;
      
        default:
          output += "<string>" + request[property] + "</string>\n";
          break;
      }
      
      output += "</value>\n";
      output += "</param>\n";
    });

    output += "</params>\n";
    output += "</methodCall>\n";

    return output;
  }

  static deserialize<T>(response: BaseResponse) {
    let obj: any;
    return (obj as T);
  }

  getType<T, K extends keyof T>(obj: T, key: K) {
    return typeof(obj[key]);
  }
}
