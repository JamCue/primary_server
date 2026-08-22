import CreateJamRequestServiceDto from '@dtos/CreateJamRequestServiceDto';
import JamAudienceAccessEnum from '@enums/JamAudienceAccessEnum';
import JamSessionTypeEnum from '@enums/JamSessionTypeEnum';
import CreateJamDtoMapper from '@mappers/CreateJamDtoMapper';
import GetFirebaseRefIdFromRequestService from '@services/parameter-validation/GetFirebaseRefIdFromRequestService';
import GetValidatedRequestBodyService from '@services/parameter-validation/GetValidatedRequestBodyService';
import CreateJamRequestService from '@services/request-services/CreateJamRequestService';
import {Request} from 'express';

import mockReturnValue from '../../utils/mockReturnValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('CreateJamRequestService', () => {
  const firebaseRefId = 'firebaseRefId';
  const payload = {
    title: 'Friday Night Jam',
    songs: [{songId: 'songId1', title: 'Tum Se Hi'}],
    scheduledAt: new Date('2026-05-17T19:30:00.000Z'),
    sessionType: JamSessionTypeEnum.OPEN,
    audienceAccess: JamAudienceAccessEnum.ANYONE_CAN_REQUEST,
    strummingDisplay: true,
    showChords: true,
    capoDisplay: true,
    requestLimit: 3,
    autoAdvance: false,
  };
  const req = {body: payload, firebaseUserId: firebaseRefId} as Request;
  const dto = Object.assign(new CreateJamRequestServiceDto(), payload, {firebaseRefId});

  const getValidatedRequestBodyService = new GetValidatedRequestBodyService();
  const getFirebaseRefIdFromRequestService = new GetFirebaseRefIdFromRequestService();
  const mapper = new CreateJamDtoMapper();
  const createJamRequestService = new CreateJamRequestService(
    getValidatedRequestBodyService,
    getFirebaseRefIdFromRequestService,
    mapper
  );

  describe('handle', () => {
    test('it handles', async () => {
      getValidatedRequestBodyService.handle = mockReturnValue(payload);
      getFirebaseRefIdFromRequestService.handle = mockReturnValue(firebaseRefId);
      mapper.map = mockReturnValue(dto);

      await expect(createJamRequestService.handle(req)).resolves.toStrictEqual(dto);
      expect(jest.spyOn(getValidatedRequestBodyService, 'handle')).toHaveBeenCalledWith(req, expect.anything());
      expect(jest.spyOn(getFirebaseRefIdFromRequestService, 'handle')).toHaveBeenCalledWith(req);
      expect(jest.spyOn(mapper, 'map')).toHaveBeenCalledWith(payload, firebaseRefId);
    });
  });
});
