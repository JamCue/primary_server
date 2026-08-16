import ResponseExceptionCodeEnum from '@enums/ResponseExceptionCodeEnum';
import AbstractHttpResponseException from '@exceptions/AbstractHttpResponseException';
import {StatusCodes} from 'http-status-codes';

class AuthTokenInvalidException extends AbstractHttpResponseException {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, {
      code: ResponseExceptionCodeEnum.AUTH_TOKEN_INVALID,
      reason: 'The authorization token is invalid or expired',
    });
  }
}

export default AuthTokenInvalidException;
