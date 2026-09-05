import JamIdInvalidException from '@exceptions/parameter-validation/JamIdInvalidException';
import JamIdType from '@t/parameter-validation/JamIdType';
import {Request} from 'express';
import {get} from 'lodash';

class GetJamIdFromParamService {
  private static readonly OBJECT_ID_PATTERN = /^[0-9a-f]{24}$/i;

  /**
   * @throws parameter-validation/JamIdInvalidException
   */
  public handle(req: Request): JamIdType {
    const paramValue = get(req.params, 'jamId', null);
    const normalizedValue = paramValue === null ? '' : String(paramValue).trim();

    if (!GetJamIdFromParamService.OBJECT_ID_PATTERN.test(normalizedValue)) {
      throw new JamIdInvalidException();
    }

    return normalizedValue;
  }
}

export default GetJamIdFromParamService;
