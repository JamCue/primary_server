import SetSongFavoriteRequestServiceDto from '@dtos/SetSongFavoriteRequestServiceDto';
import SetSongFavoriteDtoMapper from '@mappers/SetSongFavoriteDtoMapper';
import GetFirebaseRefIdFromRequestService from '@services/parameter-validation/GetFirebaseRefIdFromRequestService';
import GetSongIdFromParamService from '@services/parameter-validation/GetSongIdFromParamService';
import GetValidatedRequestBodyService from '@services/parameter-validation/GetValidatedRequestBodyService';
import SetSongFavoriteRequestService from '@services/request-services/SetSongFavoriteRequestService';
import {Request} from 'express';

import mockReturnValue from '../../utils/mockReturnValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('SetSongFavoriteRequestService', () => {
  const songId = '507f1f77bcf86cd799439011';
  const isFavorite = true;
  const firebaseRefId = 'firebaseRefId';
  const req = {params: {songId}, body: {isFavorite}, firebaseUserId: firebaseRefId} as unknown as Request;
  const dto = Object.assign(new SetSongFavoriteRequestServiceDto(), {songId, isFavorite, firebaseRefId});

  const getSongIdFromParamService = new GetSongIdFromParamService();
  const getValidatedRequestBodyService = new GetValidatedRequestBodyService();
  const getFirebaseRefIdFromRequestService = new GetFirebaseRefIdFromRequestService();
  const mapper = new SetSongFavoriteDtoMapper();
  const setSongFavoriteRequestService = new SetSongFavoriteRequestService(
    getSongIdFromParamService,
    getValidatedRequestBodyService,
    getFirebaseRefIdFromRequestService,
    mapper
  );

  describe('handle', () => {
    test('it handles', async () => {
      getSongIdFromParamService.handle = mockReturnValue(songId);
      getValidatedRequestBodyService.handle = mockReturnValue({isFavorite});
      getFirebaseRefIdFromRequestService.handle = mockReturnValue(firebaseRefId);
      mapper.map = mockReturnValue(dto);

      await expect(setSongFavoriteRequestService.handle(req)).resolves.toStrictEqual(dto);
      expect(jest.spyOn(getSongIdFromParamService, 'handle')).toHaveBeenCalledWith(req);
      expect(jest.spyOn(getValidatedRequestBodyService, 'handle')).toHaveBeenCalledWith(req, expect.anything());
      expect(jest.spyOn(getFirebaseRefIdFromRequestService, 'handle')).toHaveBeenCalledWith(req);
      expect(jest.spyOn(mapper, 'map')).toHaveBeenCalledWith(songId, {isFavorite}, firebaseRefId);
    });
  });
});
