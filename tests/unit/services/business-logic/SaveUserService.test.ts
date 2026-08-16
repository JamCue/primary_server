import CreateUserRequestServiceDto from '@dtos/CreateUserRequestServiceDto';
import DbException from '@exceptions/inner/DbException';
import SaveUserServiceException from '@exceptions/inner/SaveUserServiceException';
import UserRepository from '@repositories/UserRepository';
import SaveUserService from '@services/business-logic/SaveUserService';
import UserType from '@t/UserType';

import mockImplementation from '../../utils/mockImplementation';
import mockResolvedValue from '../../utils/mockResolvedValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('SaveUserService', () => {
  const dto = Object.assign(new CreateUserRequestServiceDto(), {
    name: 'name',
    email: 'user@example.com',
    firebaseRefId: 'firebaseRefId',
  });
  const user = {
    id: 'id',
    name: dto.name,
    email: dto.email,
    firebaseRefId: dto.firebaseRefId,
    createdAt: new Date(),
  } as UserType;

  const userRepository = new UserRepository();
  const saveUserService = new SaveUserService(userRepository);

  describe('handle', () => {
    describe('when userRepository fails', () => {
      test('it throws SaveUserServiceException', async () => {
        userRepository.save = mockImplementation(() => {
          throw new DbException(new Error());
        });

        await expect(saveUserService.handle(dto)).rejects.toBeInstanceOf(SaveUserServiceException);
      });
    });

    test('it handles', async () => {
      userRepository.save = mockResolvedValue(user);

      await expect(saveUserService.handle(dto)).resolves.toStrictEqual(user);
      expect(jest.spyOn(userRepository, 'save')).toHaveBeenCalledWith(dto.name, dto.email, dto.firebaseRefId);
    });
  });
});
