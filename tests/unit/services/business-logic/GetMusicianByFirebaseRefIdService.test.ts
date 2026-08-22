import GetUserByFirebaseRefIdServiceException from '@exceptions/inner/GetUserByFirebaseRefIdServiceException';
import UserNotFoundException from '@exceptions/UserNotFoundException';
import UserRepository from '@repositories/UserRepository';
import GetMusicianByFirebaseRefIdService from '@services/business-logic/GetMusicianByFirebaseRefIdService';
import UserType from '@t/UserType';

import mockImplementation from '../../utils/mockImplementation';
import mockResolvedValue from '../../utils/mockResolvedValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('GetMusicianByFirebaseRefIdService', () => {
  const firebaseRefId = 'firebaseRefId';
  const musician = {id: 'id', name: 'name', email: 'user@example.com', firebaseRefId} as UserType;

  const userRepository = new UserRepository();
  const getMusicianByFirebaseRefIdService = new GetMusicianByFirebaseRefIdService(userRepository);

  describe('handle', () => {
    describe('when userRepository fails', () => {
      test('it throws GetUserByFirebaseRefIdServiceException', async () => {
        userRepository.getByFirebaseRefId = mockImplementation(() => {
          throw new Error();
        });

        await expect(getMusicianByFirebaseRefIdService.handle(firebaseRefId)).rejects.toBeInstanceOf(
          GetUserByFirebaseRefIdServiceException
        );
      });
    });

    describe('when no musician is found', () => {
      test('it throws UserNotFoundException', async () => {
        userRepository.getByFirebaseRefId = mockResolvedValue(null);

        await expect(getMusicianByFirebaseRefIdService.handle(firebaseRefId)).rejects.toBeInstanceOf(
          UserNotFoundException
        );
      });
    });

    test('it handles', async () => {
      userRepository.getByFirebaseRefId = mockResolvedValue(musician);

      await expect(getMusicianByFirebaseRefIdService.handle(firebaseRefId)).resolves.toStrictEqual(musician);
      expect(jest.spyOn(userRepository, 'getByFirebaseRefId')).toHaveBeenCalledWith(firebaseRefId);
    });
  });
});
