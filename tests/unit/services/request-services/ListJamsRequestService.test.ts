import ListJamsRequestServiceDto from '@dtos/ListJamsRequestServiceDto';
import ListJamsDtoMapper from '@mappers/ListJamsDtoMapper';
import GetFirebaseRefIdFromRequestService from '@services/parameter-validation/GetFirebaseRefIdFromRequestService';
import GetValidatedRequestQueryService from '@services/parameter-validation/GetValidatedRequestQueryService';
import ListJamsRequestService from '@services/request-services/ListJamsRequestService';
import {Request} from 'express';

import mockReturnValue from '../../utils/mockReturnValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('ListJamsRequestService', () => {
  const firebaseRefId = 'firebaseRefId';
  const query = {page: 1, limit: 20};
  const req = {query, firebaseUserId: firebaseRefId} as unknown as Request;
  const dto = Object.assign(new ListJamsRequestServiceDto(), query, {firebaseRefId});

  const getValidatedRequestQueryService = new GetValidatedRequestQueryService();
  const getFirebaseRefIdFromRequestService = new GetFirebaseRefIdFromRequestService();
  const mapper = new ListJamsDtoMapper();
  const listJamsRequestService = new ListJamsRequestService(
    getValidatedRequestQueryService,
    getFirebaseRefIdFromRequestService,
    mapper
  );

  describe('handle', () => {
    test('it handles', async () => {
      getValidatedRequestQueryService.handle = mockReturnValue(query);
      getFirebaseRefIdFromRequestService.handle = mockReturnValue(firebaseRefId);
      mapper.map = mockReturnValue(dto);

      await expect(listJamsRequestService.handle(req)).resolves.toStrictEqual(dto);
      expect(jest.spyOn(getValidatedRequestQueryService, 'handle')).toHaveBeenCalledWith(req, expect.anything());
      expect(jest.spyOn(getFirebaseRefIdFromRequestService, 'handle')).toHaveBeenCalledWith(req);
      expect(jest.spyOn(mapper, 'map')).toHaveBeenCalledWith(query, firebaseRefId);
    });
  });
});
