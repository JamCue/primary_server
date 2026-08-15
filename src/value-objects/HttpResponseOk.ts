import HttpServiceResponseInterface from '@i/HttpServiceResponseInterface';
import {StatusCodes} from 'http-status-codes';

class HttpResponseOk implements HttpServiceResponseInterface {
  constructor(public readonly payload: object | string) {}

  get status(): StatusCodes {
    return StatusCodes.OK;
  }
}

export default HttpResponseOk;
