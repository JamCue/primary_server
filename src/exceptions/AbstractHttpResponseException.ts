import ResponseExceptionMessageType from '@t/ResponseExceptionMessageType';
import {StatusCodes} from 'http-status-codes';

abstract class AbstractHttpResponseException {
  constructor(
    public readonly status: StatusCodes,
    public readonly message: ResponseExceptionMessageType
  ) {}
}

export default AbstractHttpResponseException;
