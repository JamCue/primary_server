import ResponseExceptionCodeEnum from '@enums/ResponseExceptionCodeEnum';
import AbstractHttpResponseException from '@exceptions/AbstractHttpResponseException';
import {StatusCodes} from 'http-status-codes';

class SongNotFoundException extends AbstractHttpResponseException {
  constructor() {
    super(StatusCodes.NOT_FOUND, {
      code: ResponseExceptionCodeEnum.SONG_NOT_FOUND,
      reason: 'No song was found for the authenticated musician',
    });
  }
}

export default SongNotFoundException;
