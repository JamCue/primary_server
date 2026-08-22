import ListSongsRequestServiceDto from '@dtos/ListSongsRequestServiceDto';
import RequestServiceInterface from '@i/RequestServiceInterface';
import ListSongsDtoMapper from '@mappers/ListSongsDtoMapper';
import listSongsQuerySchema from '@schemas/ListSongsQuerySchema';
import GetFirebaseRefIdFromRequestService from '@services/parameter-validation/GetFirebaseRefIdFromRequestService';
import GetValidatedRequestQueryService from '@services/parameter-validation/GetValidatedRequestQueryService';
import {Request} from 'express';

class ListSongsRequestService implements RequestServiceInterface {
  constructor(
    private readonly getValidatedRequestQueryService = new GetValidatedRequestQueryService(),
    private readonly getFirebaseRefIdFromRequestService = new GetFirebaseRefIdFromRequestService(),
    private readonly mapper = new ListSongsDtoMapper()
  ) {}

  /**
   * @throws parameter-validation/RequestValidationException
   * @throws parameter-validation/FirebaseRefIdMissingException
   */
  public async handle(req: Request): Promise<ListSongsRequestServiceDto> {
    const query = this.getValidatedRequestQueryService.handle(req, listSongsQuerySchema);
    const firebaseRefId = this.getFirebaseRefIdFromRequestService.handle(req);

    return this.mapper.map(query, firebaseRefId);
  }
}

export default ListSongsRequestService;
