import GetLoggedInUserRequestServiceDto from '@dtos/GetLoggedInUserRequestServiceDto';
import RequestServiceInterface from '@i/RequestServiceInterface';
import GetLoggedInUserDtoMapper from '@mappers/GetLoggedInUserDtoMapper';
import GetFirebaseRefIdFromRequestService from '@services/parameter-validation/GetFirebaseRefIdFromRequestService';
import {Request} from 'express';

class GetLoggedInUserRequestService implements RequestServiceInterface {
  constructor(
    private readonly getFirebaseRefIdFromRequestService = new GetFirebaseRefIdFromRequestService(),
    private readonly mapper = new GetLoggedInUserDtoMapper()
  ) {}

  /**
   * @throws parameter-validation/FirebaseRefIdMissingException
   */
  public async handle(req: Request): Promise<GetLoggedInUserRequestServiceDto> {
    const firebaseRefId = this.getFirebaseRefIdFromRequestService.handle(req);

    return this.mapper.map({firebaseRefId});
  }
}

export default GetLoggedInUserRequestService;
