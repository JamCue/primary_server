import ResponseExceptionCodeEnum from '@enums/ResponseExceptionCodeEnum';
import AbstractHttpResponseException from '@exceptions/AbstractHttpResponseException';
import {StatusCodes} from 'http-status-codes';

class UserNotFoundException extends AbstractHttpResponseException {
  constructor() {
    super(StatusCodes.NOT_FOUND, {
      code: ResponseExceptionCodeEnum.USER_NOT_FOUND,
      reason: 'No user was found for the authenticated request',
    });
  }
}

export default UserNotFoundException;
