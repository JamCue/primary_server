import UserEmailInvalidException from '@exceptions/parameter-validation/UserEmailInvalidException';
import UserEmailType from '@t/parameter-validation/UserEmailType';
import {Request} from 'express';
import {get} from 'lodash';
import isEmail from 'validator/lib/isEmail';

class GetUserEmailFromBodyService {
  /**
   * @throws parameter-validation/UserEmailInvalidException
   */
  public handle(req: Request): UserEmailType {
    const bodyValue: unknown = get(req.body, 'email', null);
    const normalizedValue = bodyValue === null ? '' : String(bodyValue).trim().toLowerCase();

    if (!isEmail(normalizedValue)) {
      throw new UserEmailInvalidException();
    }

    return normalizedValue;
  }
}

export default GetUserEmailFromBodyService;
