import ResponseExceptionCodeEnum from '@enums/ResponseExceptionCodeEnum';
import AbstractHttpResponseException from '@exceptions/AbstractHttpResponseException';
import {StatusCodes} from 'http-status-codes';

class FirebaseRefIdMissingException extends AbstractHttpResponseException {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, {
      code: ResponseExceptionCodeEnum.FIREBASE_REF_ID_MISSING,
      reason: 'Firebase reference id is missing from the authenticated request',
    });
  }
}

export default FirebaseRefIdMissingException;
