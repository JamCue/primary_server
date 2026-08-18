import CheckIfUserEmailExistsRequestServiceDto from '@dtos/CheckIfUserEmailExistsRequestServiceDto';
import HttpServiceInterface from '@i/HttpServiceInterface';
import CheckIfUserEmailUsedService from '@services/business-logic/CheckIfUserEmailUsedService';
import HttpResponseOk from '@value-objects/HttpResponseOk';

class CheckIfUserEmailExistsService implements HttpServiceInterface {
  constructor(private readonly checkIfUserEmailUsedService = new CheckIfUserEmailUsedService()) {}

  /**
   * @throws inner/GetUserByEmailServiceException
   */
  public async handle(dto: CheckIfUserEmailExistsRequestServiceDto): Promise<HttpResponseOk> {
    const exists = await this.checkIfUserEmailUsedService.handle(dto.email);

    return new HttpResponseOk({exists});
  }
}

export default CheckIfUserEmailExistsService;
