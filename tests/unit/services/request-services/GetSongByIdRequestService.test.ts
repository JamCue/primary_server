import GetSongByIdRequestServiceDto from '@dtos/GetSongByIdRequestServiceDto';
import GetSongByIdDtoMapper from '@mappers/GetSongByIdDtoMapper';
import GetFirebaseRefIdFromRequestService from '@services/parameter-validation/GetFirebaseRefIdFromRequestService';
import GetSongIdFromParamService from '@services/parameter-validation/GetSongIdFromParamService';
import GetSongByIdRequestService from '@services/request-services/GetSongByIdRequestService';
import {Request} from 'express';

import mockReturnValue from '../../utils/mockReturnValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('GetSongByIdRequestService', () => {
  const songId = '507f1f77bcf86cd799439011';
  const firebaseRefId = 'firebaseRefId';
  const req = {params: {songId}, firebaseUserId: firebaseRefId} as unknown as Request;
  const dto = Object.assign(new GetSongByIdRequestServiceDto(), {songId, firebaseRefId});

  const getSongIdFromParamService = new GetSongIdFromParamService();
  const getFirebaseRefIdFromRequestService = new GetFirebaseRefIdFromRequestService();
  const mapper = new GetSongByIdDtoMapper();
  const getSongByIdRequestService = new GetSongByIdRequestService(
    getSongIdFromParamService,
    getFirebaseRefIdFromRequestService,
    mapper
  );

  describe('handle', () => {
    test('it handles', async () => {
      getSongIdFromParamService.handle = mockReturnValue(songId);
      getFirebaseRefIdFromRequestService.handle = mockReturnValue(firebaseRefId);
      mapper.map = mockReturnValue(dto);

      await expect(getSongByIdRequestService.handle(req)).resolves.toStrictEqual(dto);
      expect(jest.spyOn(getSongIdFromParamService, 'handle')).toHaveBeenCalledWith(req);
      expect(jest.spyOn(getFirebaseRefIdFromRequestService, 'handle')).toHaveBeenCalledWith(req);
      expect(jest.spyOn(mapper, 'map')).toHaveBeenCalledWith(songId, firebaseRefId);
    });
  });
});
