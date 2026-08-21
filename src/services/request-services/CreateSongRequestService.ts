import CreateSongRequestServiceDto from '@dtos/CreateSongRequestServiceDto';
import RequestServiceInterface from '@i/RequestServiceInterface';
import CreateSongDtoMapper from '@mappers/CreateSongDtoMapper';
import createSongSchema from '@schemas/CreateSongSchema';
import GetFirebaseRefIdFromRequestService from '@services/parameter-validation/GetFirebaseRefIdFromRequestService';
import GetValidatedRequestBodyService from '@services/parameter-validation/GetValidatedRequestBodyService';
import {Request} from 'express';

class CreateSongRequestService implements RequestServiceInterface {
  constructor(
    private readonly getValidatedRequestBodyService = new GetValidatedRequestBodyService(),
    private readonly getFirebaseRefIdFromRequestService = new GetFirebaseRefIdFromRequestService(),
    private readonly mapper = new CreateSongDtoMapper()
  ) {}

  /**
   * @throws parameter-validation/RequestValidationException
   * @throws parameter-validation/FirebaseRefIdMissingException
   */
  public async handle(req: Request): Promise<CreateSongRequestServiceDto> {
    const payload = this.getValidatedRequestBodyService.handle(req, createSongSchema);
    const firebaseRefId = this.getFirebaseRefIdFromRequestService.handle(req);

    return this.mapper.map(payload, firebaseRefId);
  }
}

export default CreateSongRequestService;
