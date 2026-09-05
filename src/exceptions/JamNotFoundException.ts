import ResponseExceptionCodeEnum from '@enums/ResponseExceptionCodeEnum';
import AbstractHttpResponseException from '@exceptions/AbstractHttpResponseException';
import {StatusCodes} from 'http-status-codes';

class JamNotFoundException extends AbstractHttpResponseException {
  constructor() {
    super(StatusCodes.NOT_FOUND, {
      code: ResponseExceptionCodeEnum.JAM_NOT_FOUND,
      reason: 'No jam was found for the authenticated musician',
    });
  }
}

export default JamNotFoundException;
