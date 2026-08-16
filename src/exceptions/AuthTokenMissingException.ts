import ResponseExceptionCodeEnum from '@enums/ResponseExceptionCodeEnum';
import AbstractHttpResponseException from '@exceptions/AbstractHttpResponseException';
import {StatusCodes} from 'http-status-codes';

class AuthTokenMissingException extends AbstractHttpResponseException {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, {
      code: ResponseExceptionCodeEnum.AUTH_TOKEN_MISSING,
      reason: 'No authorization token was provided',
    });
  }
}

export default AuthTokenMissingException;
