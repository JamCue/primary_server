import ResponseExceptionCodeEnum from '@enums/ResponseExceptionCodeEnum';
import AbstractHttpResponseException from '@exceptions/AbstractHttpResponseException';
import {StatusCodes} from 'http-status-codes';

class UserNameInvalidException extends AbstractHttpResponseException {
  constructor() {
    super(StatusCodes.BAD_REQUEST, {
      code: ResponseExceptionCodeEnum.USER_NAME_INVALID,
      reason: 'Invalid user name',
    });
  }
}

export default UserNameInvalidException;
