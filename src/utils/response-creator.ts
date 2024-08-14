import { IResponse } from "../interfaces/response.interface";
import { Response } from "express";

export class ResponseCreator {
  private data?: Object | string;
  private statusCode: number = 200;
  private headers?: Object;
  private message?: string;

  setData(data: Object | string) {
    this.data = data;
    return this;
  }

  setHeaders(headers: Object) {
    this.headers = headers;
    return this;
  }

  setMessage(message: string) {
    this.message = message;
    return this;
  }

  setStatusCode(code: number) {
    this.statusCode = code;
    return this;
  }

  buildResponse(): IResponse {
    return {
      success: true,
      data: this.data,
      statusCode: this.statusCode,
      headers: this.headers,
      message: this.message,
    };
  }
  sendResponse(res: Response): void {
    const response = this.buildResponse();
    if (response.headers) {
      res.set(response.headers);
    }
    res.status(this.statusCode).json(response);
  }
}
