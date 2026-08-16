import GetUserByFirebaseRefIdServiceException from '@exceptions/inner/GetUserByFirebaseRefIdServiceException';
import UserNotFoundException from '@exceptions/UserNotFoundException';
import HttpServiceInterface from '@i/HttpServiceInterface';
import UserRepository from '@repositories/UserRepository';
import FirebaseRefIdType from '@t/parameter-validation/FirebaseRefIdType';
import UserType from '@t/UserType';
import HttpResponseOk from '@value-objects/HttpResponseOk';

class GetLoggedInUserService implements HttpServiceInterface {
  constructor(private readonly userRepository = new UserRepository()) {}

  /**
   * @throws inner/GetUserByFirebaseRefIdServiceException
   * @throws UserNotFoundException
   */
  public async handle(firebaseRefId: FirebaseRefIdType): Promise<HttpResponseOk> {
    const user = await this.getUser(firebaseRefId);

    if (!user) {
      throw new UserNotFoundException();
    }

    return new HttpResponseOk(user);
  }

  private async getUser(firebaseRefId: FirebaseRefIdType): Promise<UserType | null> {
    try {
      return await this.userRepository.getByFirebaseRefId(firebaseRefId);
    } catch (e) {
      throw new GetUserByFirebaseRefIdServiceException(e);
    }
  }
}

export default GetLoggedInUserService;
