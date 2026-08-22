import GetUserByFirebaseRefIdServiceException from '@exceptions/inner/GetUserByFirebaseRefIdServiceException';
import UserNotFoundException from '@exceptions/UserNotFoundException';
import UserRepository from '@repositories/UserRepository';
import FirebaseRefIdType from '@t/parameter-validation/FirebaseRefIdType';
import UserType from '@t/UserType';

class GetMusicianByFirebaseRefIdService {
  constructor(private readonly userRepository = new UserRepository()) {}

  /**
   * @throws inner/GetUserByFirebaseRefIdServiceException
   * @throws UserNotFoundException
   */
  public async handle(firebaseRefId: FirebaseRefIdType): Promise<UserType> {
    const musician = await this.findMusician(firebaseRefId);

    if (!musician) {
      throw new UserNotFoundException();
    }

    return musician;
  }

  private async findMusician(firebaseRefId: FirebaseRefIdType): Promise<UserType | null> {
    try {
      return await this.userRepository.getByFirebaseRefId(firebaseRefId);
    } catch (e) {
      throw new GetUserByFirebaseRefIdServiceException(e);
    }
  }
}

export default GetMusicianByFirebaseRefIdService;
