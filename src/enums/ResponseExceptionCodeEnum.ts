enum ResponseExceptionCodeEnum {
  UNKNOWN = 'unknown',
  USER_EMAIL_INVALID = 'user_email_invalid',
  USER_EMAIL_ALREADY_USED = 'user_email_already_used',
  AUTH_TOKEN_MISSING = 'auth_token_missing',
  AUTH_TOKEN_INVALID = 'auth_token_invalid',
  FIREBASE_REF_ID_MISSING = 'firebase_ref_id_missing',
  USER_NOT_FOUND = 'user_not_found',
  REQUEST_VALIDATION_FAILED = 'request_validation_failed',
  FILE_MISSING = 'file_missing',
  FILE_TYPE_INVALID = 'file_type_invalid',
  FILE_TOO_LARGE = 'file_too_large',
  FILE_UPLOAD_FAILED = 'file_upload_failed',
  FILE_TEXT_EXTRACTION_FAILED = 'file_text_extraction_failed',
  SONG_NOT_FOUND = 'song_not_found',
  SONG_ID_INVALID = 'song_id_invalid',
  JAM_NOT_FOUND = 'jam_not_found',
  JAM_ID_INVALID = 'jam_id_invalid',
}

export default ResponseExceptionCodeEnum;
