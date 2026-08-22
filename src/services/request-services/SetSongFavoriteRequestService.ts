import SetSongFavoriteRequestServiceDto from '@dtos/SetSongFavoriteRequestServiceDto';
import RequestServiceInterface from '@i/RequestServiceInterface';
import SetSongFavoriteDtoMapper from '@mappers/SetSongFavoriteDtoMapper';
import setSongFavoriteSchema from '@schemas/SetSongFavoriteSchema';
import GetFirebaseRefIdFromRequestService from '@services/parameter-validation/GetFirebaseRefIdFromRequestService';
import GetSongIdFromParamService from '@services/parameter-validation/GetSongIdFromParamService';
import GetValidatedRequestBodyService from '@services/parameter-validation/GetValidatedRequestBodyService';
import {Request} from 'express';

class SetSongFavoriteRequestService implements RequestServiceInterface {
  constructor(
    private readonly getSongIdFromParamService = new GetSongIdFromParamService(),
    private readonly getValidatedRequestBodyService = new GetValidatedRequestBodyService(),
    private readonly getFirebaseRefIdFromRequestService = new GetFirebaseRefIdFromRequestService(),
    private readonly mapper = new SetSongFavoriteDtoMapper()
  ) {}

  /**
   * @throws parameter-validation/SongIdInvalidException
   * @throws parameter-validation/RequestValidationException
   * @throws parameter-validation/FirebaseRefIdMissingException
   */
  public async handle(req: Request): Promise<SetSongFavoriteRequestServiceDto> {
    const songId = this.getSongIdFromParamService.handle(req);
    const payload = this.getValidatedRequestBodyService.handle(req, setSongFavoriteSchema);
    const firebaseRefId = this.getFirebaseRefIdFromRequestService.handle(req);

    return this.mapper.map(songId, payload, firebaseRefId);
  }
}

export default SetSongFavoriteRequestService;
