import ResponseExceptionCodeEnum from '@enums/ResponseExceptionCodeEnum';
import AbstractHttpResponseException from '@exceptions/AbstractHttpResponseException';
import {StatusCodes} from 'http-status-codes';

class UserEmailAlreadyUsedException extends AbstractHttpResponseException {
  constructor() {
    super(StatusCodes.CONFLICT, {
      code: ResponseExceptionCodeEnum.USER_EMAIL_ALREADY_USED,
      reason: 'A user with this email already exists',
    });
  }
}

export default UserEmailAlreadyUsedException;
