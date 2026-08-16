import DbException from '@exceptions/inner/DbException';
import GetUserByFirebaseRefIdServiceException from '@exceptions/inner/GetUserByFirebaseRefIdServiceException';
import UserNotFoundException from '@exceptions/UserNotFoundException';
import UserRepository from '@repositories/UserRepository';
import GetLoggedInUserService from '@services/business-logic/GetLoggedInUserService';
import UserType from '@t/UserType';
import HttpResponseOk from '@value-objects/HttpResponseOk';

import mockImplementation from '../../utils/mockImplementation';
import mockResolvedValue from '../../utils/mockResolvedValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('GetLoggedInUserService', () => {
  const firebaseRefId = 'firebaseRefId';
  const user = {id: 'id', name: 'name', email: 'user@example.com', firebaseRefId, createdAt: new Date()} as UserType;

  const userRepository = new UserRepository();
  const getLoggedInUserService = new GetLoggedInUserService(userRepository);

  describe('handle', () => {
    describe('when userRepository fails', () => {
      test('it throws GetUserByFirebaseRefIdServiceException', async () => {
        userRepository.getByFirebaseRefId = mockImplementation(() => {
          throw new DbException(new Error());
        });

        await expect(getLoggedInUserService.handle(firebaseRefId)).rejects.toBeInstanceOf(
          GetUserByFirebaseRefIdServiceException
        );
      });
    });

    describe('when no user is found', () => {
      test('it throws UserNotFoundException', async () => {
        userRepository.getByFirebaseRefId = mockResolvedValue(null);

        await expect(getLoggedInUserService.handle(firebaseRefId)).rejects.toBeInstanceOf(UserNotFoundException);
        expect(jest.spyOn(userRepository, 'getByFirebaseRefId')).toHaveBeenCalledWith(firebaseRefId);
      });
    });

    test('it handles', async () => {
      userRepository.getByFirebaseRefId = mockResolvedValue(user);

      await expect(getLoggedInUserService.handle(firebaseRefId)).resolves.toStrictEqual(new HttpResponseOk(user));
      expect(jest.spyOn(userRepository, 'getByFirebaseRefId')).toHaveBeenCalledWith(firebaseRefId);
    });
  });
});
