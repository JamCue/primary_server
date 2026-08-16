import CreateUserRequestServiceDto from '@dtos/CreateUserRequestServiceDto';
import RequestServiceInterface from '@i/RequestServiceInterface';
import CreateUserDtoMapper from '@mappers/CreateUserDtoMapper';
import GetFirebaseRefIdFromRequestService from '@services/parameter-validation/GetFirebaseRefIdFromRequestService';
import GetUserEmailFromBodyService from '@services/parameter-validation/GetUserEmailFromBodyService';
import GetUserNameFromBodyService from '@services/parameter-validation/GetUserNameFromBodyService';
import {Request} from 'express';

class CreateUserRequestService implements RequestServiceInterface {
  constructor(
    private readonly getUserNameFromBodyService = new GetUserNameFromBodyService(),
    private readonly getUserEmailFromBodyService = new GetUserEmailFromBodyService(),
    private readonly getFirebaseRefIdFromRequestService = new GetFirebaseRefIdFromRequestService(),
    private readonly mapper = new CreateUserDtoMapper()
  ) {}

  /**
   * @throws parameter-validation/UserNameInvalidException
   * @throws parameter-validation/UserEmailInvalidException
   * @throws parameter-validation/FirebaseRefIdMissingException
   */
  public async handle(req: Request): Promise<CreateUserRequestServiceDto> {
    const name = this.getUserNameFromBodyService.handle(req);
    const email = this.getUserEmailFromBodyService.handle(req);
    const firebaseRefId = this.getFirebaseRefIdFromRequestService.handle(req);

    return this.mapper.map({name, email, firebaseRefId});
  }
}

export default CreateUserRequestService;
