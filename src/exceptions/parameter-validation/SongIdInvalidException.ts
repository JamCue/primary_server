import ResponseExceptionCodeEnum from '@enums/ResponseExceptionCodeEnum';
import AbstractHttpResponseException from '@exceptions/AbstractHttpResponseException';
import {StatusCodes} from 'http-status-codes';

class SongIdInvalidException extends AbstractHttpResponseException {
  constructor() {
    super(StatusCodes.BAD_REQUEST, {
      code: ResponseExceptionCodeEnum.SONG_ID_INVALID,
      reason: 'Invalid song id',
    });
  }
}

export default SongIdInvalidException;
