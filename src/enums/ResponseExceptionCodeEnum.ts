enum ResponseExceptionCodeEnum {
  UNKNOWN = 'unknown',
  USER_NAME_INVALID = 'user_name_invalid',
  USER_EMAIL_INVALID = 'user_email_invalid',
  USER_EMAIL_ALREADY_USED = 'user_email_already_used',
  AUTH_TOKEN_MISSING = 'auth_token_missing',
  AUTH_TOKEN_INVALID = 'auth_token_invalid',
  FIREBASE_REF_ID_MISSING = 'firebase_ref_id_missing',
  USER_NOT_FOUND = 'user_not_found',
  REQUEST_BODY_INVALID = 'request_body_invalid',
}

export default ResponseExceptionCodeEnum;
