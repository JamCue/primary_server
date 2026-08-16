import ResponseExceptionCodeEnum from '@enums/ResponseExceptionCodeEnum';
import AbstractHttpResponseException from '@exceptions/AbstractHttpResponseException';
import {StatusCodes} from 'http-status-codes';

class UserEmailInvalidException extends AbstractHttpResponseException {
  constructor() {
    super(StatusCodes.BAD_REQUEST, {
      code: ResponseExceptionCodeEnum.USER_EMAIL_INVALID,
      reason: 'Invalid user email',
    });
  }
}

export default UserEmailInvalidException;
