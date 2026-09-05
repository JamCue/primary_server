import ResponseExceptionCodeEnum from '@enums/ResponseExceptionCodeEnum';
import AbstractHttpResponseException from '@exceptions/AbstractHttpResponseException';
import {StatusCodes} from 'http-status-codes';

class JamIdInvalidException extends AbstractHttpResponseException {
  constructor() {
    super(StatusCodes.BAD_REQUEST, {
      code: ResponseExceptionCodeEnum.JAM_ID_INVALID,
      reason: 'Invalid jam id',
    });
  }
}

export default JamIdInvalidException;
