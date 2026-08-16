import CreateUserRequestServiceDto from '@dtos/CreateUserRequestServiceDto';
import UserEmailAlreadyUsedException from '@exceptions/UserEmailAlreadyUsedException';
import HttpServiceInterface from '@i/HttpServiceInterface';
import HttpServiceResponseInterface from '@i/HttpServiceResponseInterface';
import CheckIfUserEmailUsedService from '@services/business-logic/CheckIfUserEmailUsedService';
import SaveUserService from '@services/business-logic/SaveUserService';
import HttpResponseCreated from '@value-objects/HttpResponseCreated';

class CreateUserService implements HttpServiceInterface {
  constructor(
    private readonly checkIfUserEmailUsedService = new CheckIfUserEmailUsedService(),
    private readonly saveUserService = new SaveUserService()
  ) {}

  /**
   * @throws inner/GetUserByEmailServiceException
   * @throws inner/SaveUserServiceException
   * @throws UserEmailAlreadyUsedException
   */
  public async handle(dto: CreateUserRequestServiceDto): Promise<HttpServiceResponseInterface> {
    const emailUsed = await this.checkIfUserEmailUsedService.handle(dto.email);

    if (emailUsed) {
      throw new UserEmailAlreadyUsedException();
    }

    const user = await this.saveUserService.handle(dto);

    return new HttpResponseCreated(user);
  }
}

export default CreateUserService;
