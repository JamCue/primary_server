import HttpServiceResponseInterface from '@i/HttpServiceResponseInterface';
import {StatusCodes} from 'http-status-codes';

class HttpResponseCreated implements HttpServiceResponseInterface {
  constructor(public readonly payload: object | string) {}

  get status(): StatusCodes {
    return StatusCodes.CREATED;
  }
}

export default HttpResponseCreated;
