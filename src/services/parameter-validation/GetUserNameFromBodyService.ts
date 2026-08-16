import UserNameInvalidException from '@exceptions/parameter-validation/UserNameInvalidException';
import UserNameType from '@t/parameter-validation/UserNameType';
import {Request} from 'express';
import {get} from 'lodash';

class GetUserNameFromBodyService {
  /**
   * @throws parameter-validation/UserNameInvalidException
   */
  public handle(req: Request): UserNameType {
    const bodyValue: unknown = get(req.body, 'name', null);
    const normalizedValue = bodyValue === null ? '' : String(bodyValue).trim();
    const isValid = normalizedValue.length >= 2 && normalizedValue.length <= 100;

    if (!isValid) {
      throw new UserNameInvalidException();
    }

    return normalizedValue;
  }
}

export default GetUserNameFromBodyService;
