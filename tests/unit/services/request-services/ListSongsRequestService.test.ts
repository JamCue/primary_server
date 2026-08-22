import ListSongsRequestServiceDto from '@dtos/ListSongsRequestServiceDto';
import ListSongsDtoMapper from '@mappers/ListSongsDtoMapper';
import GetFirebaseRefIdFromRequestService from '@services/parameter-validation/GetFirebaseRefIdFromRequestService';
import GetValidatedRequestQueryService from '@services/parameter-validation/GetValidatedRequestQueryService';
import ListSongsRequestService from '@services/request-services/ListSongsRequestService';
import {Request} from 'express';

import mockReturnValue from '../../utils/mockReturnValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('ListSongsRequestService', () => {
  const firebaseRefId = 'firebaseRefId';
  const query = {sort: 'title' as const, page: 1, limit: 20};
  const req = {query, firebaseUserId: firebaseRefId} as unknown as Request;
  const dto = Object.assign(new ListSongsRequestServiceDto(), query, {firebaseRefId});

  const getValidatedRequestQueryService = new GetValidatedRequestQueryService();
  const getFirebaseRefIdFromRequestService = new GetFirebaseRefIdFromRequestService();
  const mapper = new ListSongsDtoMapper();
  const listSongsRequestService = new ListSongsRequestService(
    getValidatedRequestQueryService,
    getFirebaseRefIdFromRequestService,
    mapper
  );

  describe('handle', () => {
    test('it handles', async () => {
      getValidatedRequestQueryService.handle = mockReturnValue(query);
      getFirebaseRefIdFromRequestService.handle = mockReturnValue(firebaseRefId);
      mapper.map = mockReturnValue(dto);

      await expect(listSongsRequestService.handle(req)).resolves.toStrictEqual(dto);
      expect(jest.spyOn(getValidatedRequestQueryService, 'handle')).toHaveBeenCalledWith(req, expect.anything());
      expect(jest.spyOn(getFirebaseRefIdFromRequestService, 'handle')).toHaveBeenCalledWith(req);
      expect(jest.spyOn(mapper, 'map')).toHaveBeenCalledWith(query, firebaseRefId);
    });
  });
});
