import ResponseExceptionCodeEnum from '@enums/ResponseExceptionCodeEnum';
import AbstractHttpResponseException from '@exceptions/AbstractHttpResponseException';
import {StatusCodes} from 'http-status-codes';

class FileTypeInvalidException extends AbstractHttpResponseException {
  constructor() {
    super(StatusCodes.BAD_REQUEST, {
      code: ResponseExceptionCodeEnum.FILE_TYPE_INVALID,
      reason: 'Only .pdf, .doc and .docx files are supported',
    });
  }
}

export default FileTypeInvalidException;
