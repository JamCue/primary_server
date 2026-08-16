import CreateUserRequestServiceDto from '@dtos/CreateUserRequestServiceDto';
import UserEmailAlreadyUsedException from '@exceptions/UserEmailAlreadyUsedException';
import CheckIfUserEmailUsedService from '@services/business-logic/CheckIfUserEmailUsedService';
import CreateUserService from '@services/business-logic/CreateUserService';
import SaveUserService from '@services/business-logic/SaveUserService';
import UserType from '@t/UserType';
import HttpResponseCreated from '@value-objects/HttpResponseCreated';

import mockResolvedValue from '../../utils/mockResolvedValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('CreateUserService', () => {
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

  const checkIfUserEmailUsedService = new CheckIfUserEmailUsedService();
  const saveUserService = new SaveUserService();
  const createUserService = new CreateUserService(checkIfUserEmailUsedService, saveUserService);

  describe('handle', () => {
    describe('when the email is already used', () => {
      test('it throws UserEmailAlreadyUsedException', async () => {
        checkIfUserEmailUsedService.handle = mockResolvedValue(true);

        await expect(createUserService.handle(dto)).rejects.toBeInstanceOf(UserEmailAlreadyUsedException);
        expect(jest.spyOn(saveUserService, 'handle')).toHaveBeenCalledTimes(0);
      });
    });

    test('it handles', async () => {
      checkIfUserEmailUsedService.handle = mockResolvedValue(false);
      saveUserService.handle = mockResolvedValue(user);

      await expect(createUserService.handle(dto)).resolves.toStrictEqual(new HttpResponseCreated(user));
      expect(jest.spyOn(checkIfUserEmailUsedService, 'handle')).toHaveBeenCalledWith(dto.email);
      expect(jest.spyOn(saveUserService, 'handle')).toHaveBeenCalledWith(dto);
    });
  });
});
