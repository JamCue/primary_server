import UpdateSongRequestServiceDto from '@dtos/UpdateSongRequestServiceDto';
import UpdateSongDtoMapper from '@mappers/UpdateSongDtoMapper';
import GetFirebaseRefIdFromRequestService from '@services/parameter-validation/GetFirebaseRefIdFromRequestService';
import GetSongIdFromParamService from '@services/parameter-validation/GetSongIdFromParamService';
import GetValidatedRequestBodyService from '@services/parameter-validation/GetValidatedRequestBodyService';
import UpdateSongRequestService from '@services/request-services/UpdateSongRequestService';
import {Request} from 'express';

import mockReturnValue from '../../utils/mockReturnValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('UpdateSongRequestService', () => {
  const songId = '507f1f77bcf86cd799439011';
  const firebaseRefId = 'firebaseRefId';
  const payload = {title: 'Offo', sheetContent: 'Eb\nOffo!'};
  const req = {params: {songId}, body: payload, firebaseUserId: firebaseRefId} as unknown as Request;
  const dto = Object.assign(new UpdateSongRequestServiceDto(), {songId, ...payload, firebaseRefId});

  const getSongIdFromParamService = new GetSongIdFromParamService();
  const getValidatedRequestBodyService = new GetValidatedRequestBodyService();
  const getFirebaseRefIdFromRequestService = new GetFirebaseRefIdFromRequestService();
  const mapper = new UpdateSongDtoMapper();
  const updateSongRequestService = new UpdateSongRequestService(
    getSongIdFromParamService,
    getValidatedRequestBodyService,
    getFirebaseRefIdFromRequestService,
    mapper
  );

  describe('handle', () => {
    test('it handles', async () => {
      getSongIdFromParamService.handle = mockReturnValue(songId);
      getValidatedRequestBodyService.handle = mockReturnValue(payload);
      getFirebaseRefIdFromRequestService.handle = mockReturnValue(firebaseRefId);
      mapper.map = mockReturnValue(dto);

      await expect(updateSongRequestService.handle(req)).resolves.toStrictEqual(dto);
      expect(jest.spyOn(getSongIdFromParamService, 'handle')).toHaveBeenCalledWith(req);
      expect(jest.spyOn(getValidatedRequestBodyService, 'handle')).toHaveBeenCalledWith(req, expect.anything());
      expect(jest.spyOn(getFirebaseRefIdFromRequestService, 'handle')).toHaveBeenCalledWith(req);
      expect(jest.spyOn(mapper, 'map')).toHaveBeenCalledWith(songId, payload, firebaseRefId);
    });
  });
});
