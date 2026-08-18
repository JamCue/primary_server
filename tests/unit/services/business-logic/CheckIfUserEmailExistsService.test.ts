import CheckIfUserEmailExistsRequestServiceDto from '@dtos/CheckIfUserEmailExistsRequestServiceDto';
import CheckIfUserEmailExistsService from '@services/business-logic/CheckIfUserEmailExistsService';
import CheckIfUserEmailUsedService from '@services/business-logic/CheckIfUserEmailUsedService';
import HttpResponseOk from '@value-objects/HttpResponseOk';

import mockResolvedValue from '../../utils/mockResolvedValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('CheckIfUserEmailExistsService', () => {
  const dto = Object.assign(new CheckIfUserEmailExistsRequestServiceDto(), {email: 'user@example.com'});

  const checkIfUserEmailUsedService = new CheckIfUserEmailUsedService();
  const checkIfUserEmailExistsService = new CheckIfUserEmailExistsService(checkIfUserEmailUsedService);

  describe('handle', () => {
    describe('when the email is not used', () => {
      test('it handles', async () => {
        checkIfUserEmailUsedService.handle = mockResolvedValue(false);

        await expect(checkIfUserEmailExistsService.handle(dto)).resolves.toStrictEqual(
          new HttpResponseOk({exists: false})
        );
        expect(jest.spyOn(checkIfUserEmailUsedService, 'handle')).toHaveBeenCalledWith(dto.email);
      });
    });

    test('it handles', async () => {
      checkIfUserEmailUsedService.handle = mockResolvedValue(true);

      await expect(checkIfUserEmailExistsService.handle(dto)).resolves.toStrictEqual(
        new HttpResponseOk({exists: true})
      );
      expect(jest.spyOn(checkIfUserEmailUsedService, 'handle')).toHaveBeenCalledWith(dto.email);
    });
  });
});
