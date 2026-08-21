import ResponseExceptionCodeEnum from '@enums/ResponseExceptionCodeEnum';
import AbstractHttpResponseException from '@exceptions/AbstractHttpResponseException';
import {StatusCodes} from 'http-status-codes';

class RequestValidationException extends AbstractHttpResponseException {
  constructor(errors: {path: string; message: string}[]) {
    super(StatusCodes.BAD_REQUEST, {
      code: ResponseExceptionCodeEnum.REQUEST_VALIDATION_FAILED,
      reason: 'Request validation failed',
      errors,
    });
  }
}

export default RequestValidationException;
