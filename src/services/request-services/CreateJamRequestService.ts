import CreateJamRequestServiceDto from '@dtos/CreateJamRequestServiceDto';
import RequestServiceInterface from '@i/RequestServiceInterface';
import CreateJamDtoMapper from '@mappers/CreateJamDtoMapper';
import createJamSchema from '@schemas/CreateJamSchema';
import GetFirebaseRefIdFromRequestService from '@services/parameter-validation/GetFirebaseRefIdFromRequestService';
import GetValidatedRequestBodyService from '@services/parameter-validation/GetValidatedRequestBodyService';
import {Request} from 'express';

class CreateJamRequestService implements RequestServiceInterface {
  constructor(
    private readonly getValidatedRequestBodyService = new GetValidatedRequestBodyService(),
    private readonly getFirebaseRefIdFromRequestService = new GetFirebaseRefIdFromRequestService(),
    private readonly mapper = new CreateJamDtoMapper()
  ) {}

  /**
   * @throws parameter-validation/RequestValidationException
   * @throws parameter-validation/FirebaseRefIdMissingException
   */
  public async handle(req: Request): Promise<CreateJamRequestServiceDto> {
    const payload = this.getValidatedRequestBodyService.handle(req, createJamSchema);
    const firebaseRefId = this.getFirebaseRefIdFromRequestService.handle(req);

    return this.mapper.map(payload, firebaseRefId);
  }
}

export default CreateJamRequestService;
