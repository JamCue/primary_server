import ListJamsRequestServiceDto from '@dtos/ListJamsRequestServiceDto';
import RequestServiceInterface from '@i/RequestServiceInterface';
import ListJamsDtoMapper from '@mappers/ListJamsDtoMapper';
import listJamsQuerySchema from '@schemas/ListJamsQuerySchema';
import GetFirebaseRefIdFromRequestService from '@services/parameter-validation/GetFirebaseRefIdFromRequestService';
import GetValidatedRequestQueryService from '@services/parameter-validation/GetValidatedRequestQueryService';
import {Request} from 'express';

class ListJamsRequestService implements RequestServiceInterface {
  constructor(
    private readonly getValidatedRequestQueryService = new GetValidatedRequestQueryService(),
    private readonly getFirebaseRefIdFromRequestService = new GetFirebaseRefIdFromRequestService(),
    private readonly mapper = new ListJamsDtoMapper()
  ) {}

  /**
   * @throws parameter-validation/RequestValidationException
   * @throws parameter-validation/FirebaseRefIdMissingException
   */
  public async handle(req: Request): Promise<ListJamsRequestServiceDto> {
    const query = this.getValidatedRequestQueryService.handle(req, listJamsQuerySchema);
    const firebaseRefId = this.getFirebaseRefIdFromRequestService.handle(req);

    return this.mapper.map(query, firebaseRefId);
  }
}

export default ListJamsRequestService;
