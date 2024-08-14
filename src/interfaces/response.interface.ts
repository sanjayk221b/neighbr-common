export interface IResponse {
  success: boolean;
  data?: Object | string;
  statusCode: number;
  headers?: Object;
  message?: string;
}
