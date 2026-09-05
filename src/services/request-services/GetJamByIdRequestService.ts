import GetJamByIdRequestServiceDto from '@dtos/GetJamByIdRequestServiceDto';
import RequestServiceInterface from '@i/RequestServiceInterface';
import GetJamByIdDtoMapper from '@mappers/GetJamByIdDtoMapper';
import GetFirebaseRefIdFromRequestService from '@services/parameter-validation/GetFirebaseRefIdFromRequestService';
import GetJamIdFromParamService from '@services/parameter-validation/GetJamIdFromParamService';
import {Request} from 'express';

class GetJamByIdRequestService implements RequestServiceInterface {
  constructor(
    private readonly getJamIdFromParamService = new GetJamIdFromParamService(),
    private readonly getFirebaseRefIdFromRequestService = new GetFirebaseRefIdFromRequestService(),
    private readonly mapper = new GetJamByIdDtoMapper()
  ) {}

  /**
   * @throws parameter-validation/JamIdInvalidException
   * @throws parameter-validation/FirebaseRefIdMissingException
   */
  public async handle(req: Request): Promise<GetJamByIdRequestServiceDto> {
    const jamId = this.getJamIdFromParamService.handle(req);
    const firebaseRefId = this.getFirebaseRefIdFromRequestService.handle(req);

    return this.mapper.map(jamId, firebaseRefId);
  }
}

export default GetJamByIdRequestService;
