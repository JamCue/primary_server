import DbException from '@exceptions/inner/DbException';
import GetUserByEmailServiceException from '@exceptions/inner/GetUserByEmailServiceException';
import UserRepository from '@repositories/UserRepository';
import CheckIfUserEmailUsedService from '@services/business-logic/CheckIfUserEmailUsedService';
import UserType from '@t/UserType';

import mockImplementation from '../../utils/mockImplementation';
import mockResolvedValue from '../../utils/mockResolvedValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('CheckIfUserEmailUsedService', () => {
  const email = 'user@example.com';
  const user = {id: 'id', name: 'name', email, createdAt: new Date()} as UserType;

  const userRepository = new UserRepository();
  const checkIfUserEmailUsedService = new CheckIfUserEmailUsedService(userRepository);

  describe('handle', () => {
    describe('when userRepository fails', () => {
      test('it throws GetUserByEmailServiceException', async () => {
        userRepository.getByEmail = mockImplementation(() => {
          throw new DbException(new Error());
        });

        await expect(checkIfUserEmailUsedService.handle(email)).rejects.toBeInstanceOf(GetUserByEmailServiceException);
      });
    });

    describe('when no user is found', () => {
      test('it returns', async () => {
        userRepository.getByEmail = mockResolvedValue(null);

        await expect(checkIfUserEmailUsedService.handle(email)).resolves.toStrictEqual(false);
        expect(jest.spyOn(userRepository, 'getByEmail')).toHaveBeenCalledWith(email);
      });
    });

    test('it handles', async () => {
      userRepository.getByEmail = mockResolvedValue(user);

      await expect(checkIfUserEmailUsedService.handle(email)).resolves.toStrictEqual(true);
      expect(jest.spyOn(userRepository, 'getByEmail')).toHaveBeenCalledWith(email);
    });
  });
});
