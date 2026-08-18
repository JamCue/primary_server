import CheckIfUserEmailExistsRequestServiceDto from '@dtos/CheckIfUserEmailExistsRequestServiceDto';
import RequestServiceInterface from '@i/RequestServiceInterface';
import CheckIfUserEmailExistsDtoMapper from '@mappers/CheckIfUserEmailExistsDtoMapper';
import GetUserEmailFromQueryService from '@services/parameter-validation/GetUserEmailFromQueryService';
import {Request} from 'express';

class CheckIfUserEmailExistsRequestService implements RequestServiceInterface {
  constructor(
    private readonly getUserEmailFromQueryService = new GetUserEmailFromQueryService(),
    private readonly mapper = new CheckIfUserEmailExistsDtoMapper()
  ) {}

  /**
   * @throws parameter-validation/UserEmailInvalidException
   */
  public async handle(req: Request): Promise<CheckIfUserEmailExistsRequestServiceDto> {
    const email = this.getUserEmailFromQueryService.handle(req);

    return this.mapper.map({email});
  }
}

export default CheckIfUserEmailExistsRequestService;
