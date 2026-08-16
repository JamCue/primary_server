import GetUserByEmailServiceException from '@exceptions/inner/GetUserByEmailServiceException';
import UserRepository from '@repositories/UserRepository';
import UserEmailType from '@t/parameter-validation/UserEmailType';

class CheckIfUserEmailUsedService {
  constructor(private readonly userRepository = new UserRepository()) {}

  /**
   * @throws inner/GetUserByEmailServiceException
   */
  public async handle(email: UserEmailType): Promise<boolean> {
    try {
      const user = await this.userRepository.getByEmail(email);

      return user !== null;
    } catch (e) {
      throw new GetUserByEmailServiceException(e);
    }
  }
}

export default CheckIfUserEmailUsedService;
