import ResponseExceptionCodeEnum from '@enums/ResponseExceptionCodeEnum';
import AbstractHttpResponseException from '@exceptions/AbstractHttpResponseException';
import {StatusCodes} from 'http-status-codes';

class FileTooLargeException extends AbstractHttpResponseException {
  constructor() {
    super(StatusCodes.REQUEST_TOO_LONG, {
      code: ResponseExceptionCodeEnum.FILE_TOO_LARGE,
      reason: 'The uploaded file exceeds the maximum allowed size',
    });
  }
}

export default FileTooLargeException;
