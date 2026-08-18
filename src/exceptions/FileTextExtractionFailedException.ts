import ResponseExceptionCodeEnum from '@enums/ResponseExceptionCodeEnum';
import AbstractHttpResponseException from '@exceptions/AbstractHttpResponseException';
import {StatusCodes} from 'http-status-codes';

class FileTextExtractionFailedException extends AbstractHttpResponseException {
  constructor() {
    super(StatusCodes.UNPROCESSABLE_ENTITY, {
      code: ResponseExceptionCodeEnum.FILE_TEXT_EXTRACTION_FAILED,
      reason: 'Text could not be extracted from the uploaded file',
    });
  }
}

export default FileTextExtractionFailedException;
