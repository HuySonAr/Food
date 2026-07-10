import { RES_CODE } from '../constants/responseCode.constant.js';

export default class ApiError extends Error {
  constructor(message, statusCode, responseCode = RES_CODE.FAIL) {
    super(message);
    this.statusCode = statusCode;
    this.responseCode = responseCode;
  }
}
