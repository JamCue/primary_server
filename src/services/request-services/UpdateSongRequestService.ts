import UpdateSongRequestServiceDto from '@dtos/UpdateSongRequestServiceDto';
import RequestServiceInterface from '@i/RequestServiceInterface';
import UpdateSongDtoMapper from '@mappers/UpdateSongDtoMapper';
import updateSongSchema from '@schemas/UpdateSongSchema';
import GetFirebaseRefIdFromRequestService from '@services/parameter-validation/GetFirebaseRefIdFromRequestService';
import GetSongIdFromParamService from '@services/parameter-validation/GetSongIdFromParamService';
import GetValidatedRequestBodyService from '@services/parameter-validation/GetValidatedRequestBodyService';
import {Request} from 'express';

class UpdateSongRequestService implements RequestServiceInterface {
  constructor(
    private readonly getSongIdFromParamService = new GetSongIdFromParamService(),
    private readonly getValidatedRequestBodyService = new GetValidatedRequestBodyService(),
    private readonly getFirebaseRefIdFromRequestService = new GetFirebaseRefIdFromRequestService(),
    private readonly mapper = new UpdateSongDtoMapper()
  ) {}

  /**
   * @throws parameter-validation/SongIdInvalidException
   * @throws parameter-validation/RequestValidationException
   * @throws parameter-validation/FirebaseRefIdMissingException
   */
  public async handle(req: Request): Promise<UpdateSongRequestServiceDto> {
    const songId = this.getSongIdFromParamService.handle(req);
    const payload = this.getValidatedRequestBodyService.handle(req, updateSongSchema);
    const firebaseRefId = this.getFirebaseRefIdFromRequestService.handle(req);

    return this.mapper.map(songId, payload, firebaseRefId);
  }
}

export default UpdateSongRequestService;
