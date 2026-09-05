import GetJamByIdRequestServiceDto from '@dtos/GetJamByIdRequestServiceDto';
import GetJamByIdDtoMapper from '@mappers/GetJamByIdDtoMapper';
import GetFirebaseRefIdFromRequestService from '@services/parameter-validation/GetFirebaseRefIdFromRequestService';
import GetJamIdFromParamService from '@services/parameter-validation/GetJamIdFromParamService';
import GetJamByIdRequestService from '@services/request-services/GetJamByIdRequestService';
import {Request} from 'express';

import mockReturnValue from '../../utils/mockReturnValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('GetJamByIdRequestService', () => {
  const jamId = '507f1f77bcf86cd799439011';
  const firebaseRefId = 'firebaseRefId';
  const req = {params: {jamId}, firebaseUserId: firebaseRefId} as unknown as Request;
  const dto = Object.assign(new GetJamByIdRequestServiceDto(), {jamId, firebaseRefId});

  const getJamIdFromParamService = new GetJamIdFromParamService();
  const getFirebaseRefIdFromRequestService = new GetFirebaseRefIdFromRequestService();
  const mapper = new GetJamByIdDtoMapper();
  const getJamByIdRequestService = new GetJamByIdRequestService(
    getJamIdFromParamService,
    getFirebaseRefIdFromRequestService,
    mapper
  );

  describe('handle', () => {
    test('it handles', async () => {
      getJamIdFromParamService.handle = mockReturnValue(jamId);
      getFirebaseRefIdFromRequestService.handle = mockReturnValue(firebaseRefId);
      mapper.map = mockReturnValue(dto);

      await expect(getJamByIdRequestService.handle(req)).resolves.toStrictEqual(dto);
      expect(jest.spyOn(getJamIdFromParamService, 'handle')).toHaveBeenCalledWith(req);
      expect(jest.spyOn(getFirebaseRefIdFromRequestService, 'handle')).toHaveBeenCalledWith(req);
      expect(jest.spyOn(mapper, 'map')).toHaveBeenCalledWith(jamId, firebaseRefId);
    });
  });
});
