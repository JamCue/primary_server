import CheckIfUserEmailExistsRequestServiceDto from '@dtos/CheckIfUserEmailExistsRequestServiceDto';
import CheckIfUserEmailExistsDtoMapper from '@mappers/CheckIfUserEmailExistsDtoMapper';
import GetUserEmailFromQueryService from '@services/parameter-validation/GetUserEmailFromQueryService';
import CheckIfUserEmailExistsRequestService from '@services/request-services/CheckIfUserEmailExistsRequestService';
import {Request} from 'express';

import mockReturnValue from '../../utils/mockReturnValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('CheckIfUserEmailExistsRequestService', () => {
  const email = 'user@example.com';
  const req = {query: {email}} as unknown as Request;
  const dto = Object.assign(new CheckIfUserEmailExistsRequestServiceDto(), {email});

  const getUserEmailFromQueryService = new GetUserEmailFromQueryService();
  const mapper = new CheckIfUserEmailExistsDtoMapper();
  const checkIfUserEmailExistsRequestService = new CheckIfUserEmailExistsRequestService(
    getUserEmailFromQueryService,
    mapper
  );

  describe('handle', () => {
    test('it handles', async () => {
      getUserEmailFromQueryService.handle = mockReturnValue(email);
      mapper.map = mockReturnValue(dto);

      await expect(checkIfUserEmailExistsRequestService.handle(req)).resolves.toStrictEqual(dto);
      expect(jest.spyOn(getUserEmailFromQueryService, 'handle')).toHaveBeenCalledWith(req);
      expect(jest.spyOn(mapper, 'map')).toHaveBeenCalledWith({email});
    });
  });
});
