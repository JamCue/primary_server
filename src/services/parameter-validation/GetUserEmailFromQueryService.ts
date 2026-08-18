import UserEmailInvalidException from '@exceptions/parameter-validation/UserEmailInvalidException';
import UserEmailType from '@t/parameter-validation/UserEmailType';
import {Request} from 'express';
import {get} from 'lodash';
import isEmail from 'validator/lib/isEmail';

class GetUserEmailFromQueryService {
  /**
   * @throws parameter-validation/UserEmailInvalidException
   */
  public handle(req: Request): UserEmailType {
    const queryValue: unknown = get(req.query, 'email', null);
    const normalizedValue = queryValue === null ? '' : String(queryValue).trim().toLowerCase();

    if (!isEmail(normalizedValue)) {
      throw new UserEmailInvalidException();
    }

    return normalizedValue;
  }
}

export default GetUserEmailFromQueryService;
