import CreateUserRequestServiceDto from '@dtos/CreateUserRequestServiceDto';
import SaveUserServiceException from '@exceptions/inner/SaveUserServiceException';
import UserRepository from '@repositories/UserRepository';
import UserType from '@t/UserType';

class SaveUserService {
  constructor(private readonly userRepository = new UserRepository()) {}

  /**
   * @throws inner/SaveUserServiceException
   */
  public async handle(dto: CreateUserRequestServiceDto): Promise<UserType> {
    try {
      return await this.userRepository.save(dto.name, dto.email, dto.firebaseRefId);
    } catch (e) {
      throw new SaveUserServiceException(e);
    }
  }
}

export default SaveUserService;
