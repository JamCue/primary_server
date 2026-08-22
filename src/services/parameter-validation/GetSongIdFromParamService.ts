import SongIdInvalidException from '@exceptions/parameter-validation/SongIdInvalidException';
import SongIdType from '@t/parameter-validation/SongIdType';
import {Request} from 'express';
import {get} from 'lodash';

class GetSongIdFromParamService {
  private static readonly OBJECT_ID_PATTERN = /^[0-9a-f]{24}$/i;

  /**
   * @throws parameter-validation/SongIdInvalidException
   */
  public handle(req: Request): SongIdType {
    const paramValue = get(req.params, 'songId', null);
    const normalizedValue = paramValue === null ? '' : String(paramValue).trim();

    if (!GetSongIdFromParamService.OBJECT_ID_PATTERN.test(normalizedValue)) {
      throw new SongIdInvalidException();
    }

    return normalizedValue;
  }
}

export default GetSongIdFromParamService;
