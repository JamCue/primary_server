import GetSongByIdRequestServiceDto from '@dtos/GetSongByIdRequestServiceDto';
import RequestServiceInterface from '@i/RequestServiceInterface';
import GetSongByIdDtoMapper from '@mappers/GetSongByIdDtoMapper';
import GetFirebaseRefIdFromRequestService from '@services/parameter-validation/GetFirebaseRefIdFromRequestService';
import GetSongIdFromParamService from '@services/parameter-validation/GetSongIdFromParamService';
import {Request} from 'express';

class GetSongByIdRequestService implements RequestServiceInterface {
  constructor(
    private readonly getSongIdFromParamService = new GetSongIdFromParamService(),
    private readonly getFirebaseRefIdFromRequestService = new GetFirebaseRefIdFromRequestService(),
    private readonly mapper = new GetSongByIdDtoMapper()
  ) {}

  /**
   * @throws parameter-validation/SongIdInvalidException
   * @throws parameter-validation/FirebaseRefIdMissingException
   */
  public async handle(req: Request): Promise<GetSongByIdRequestServiceDto> {
    const songId = this.getSongIdFromParamService.handle(req);
    const firebaseRefId = this.getFirebaseRefIdFromRequestService.handle(req);

    return this.mapper.map(songId, firebaseRefId);
  }
}

export default GetSongByIdRequestService;
