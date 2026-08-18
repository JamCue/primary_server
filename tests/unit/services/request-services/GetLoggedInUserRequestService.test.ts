import GetLoggedInUserRequestServiceDto from '@dtos/GetLoggedInUserRequestServiceDto';
import GetLoggedInUserDtoMapper from '@mappers/GetLoggedInUserDtoMapper';
import GetFirebaseRefIdFromRequestService from '@services/parameter-validation/GetFirebaseRefIdFromRequestService';
import GetLoggedInUserRequestService from '@services/request-services/GetLoggedInUserRequestService';
import {Request} from 'express';

import mockReturnValue from '../../utils/mockReturnValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('GetLoggedInUserRequestService', () => {
  const firebaseRefId = 'firebaseRefId';
  const req = {firebaseUserId: firebaseRefId} as Request;
  const dto = Object.assign(new GetLoggedInUserRequestServiceDto(), {firebaseRefId});

  const getFirebaseRefIdFromRequestService = new GetFirebaseRefIdFromRequestService();
  const mapper = new GetLoggedInUserDtoMapper();
  const getLoggedInUserRequestService = new GetLoggedInUserRequestService(getFirebaseRefIdFromRequestService, mapper);

  describe('handle', () => {
    test('it handles', async () => {
      getFirebaseRefIdFromRequestService.handle = mockReturnValue(firebaseRefId);
      mapper.map = mockReturnValue(dto);

      await expect(getLoggedInUserRequestService.handle(req)).resolves.toStrictEqual(dto);
      expect(jest.spyOn(getFirebaseRefIdFromRequestService, 'handle')).toHaveBeenCalledWith(req);
      expect(jest.spyOn(mapper, 'map')).toHaveBeenCalledWith({firebaseRefId});
    });
  });
});
