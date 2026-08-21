import CreateSongRequestServiceDto from '@dtos/CreateSongRequestServiceDto';
import SongSourceEnum from '@enums/SongSourceEnum';
import CreateSongDtoMapper from '@mappers/CreateSongDtoMapper';
import GetFirebaseRefIdFromRequestService from '@services/parameter-validation/GetFirebaseRefIdFromRequestService';
import GetValidatedRequestBodyService from '@services/parameter-validation/GetValidatedRequestBodyService';
import CreateSongRequestService from '@services/request-services/CreateSongRequestService';
import {Request} from 'express';

import mockReturnValue from '../../utils/mockReturnValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('CreateSongRequestService', () => {
  const firebaseRefId = 'firebaseRefId';
  const payload = {
    title: 'Offo',
    artist: 'Amit Trivedi',
    key: 'Eb',
    capo: 0,
    tempo: 120,
    timeSignature: '4/4',
    strummingPattern: 'D D U U D U',
    sheetContent: 'Eb              Fm     Bb\nOffo! Isey.. isey daant ke bhagaaun',
    source: SongSourceEnum.PDF,
  };
  const req = {body: payload, firebaseUserId: firebaseRefId} as Request;
  const dto = Object.assign(new CreateSongRequestServiceDto(), payload, {firebaseRefId});

  const getValidatedRequestBodyService = new GetValidatedRequestBodyService();
  const getFirebaseRefIdFromRequestService = new GetFirebaseRefIdFromRequestService();
  const mapper = new CreateSongDtoMapper();
  const createSongRequestService = new CreateSongRequestService(
    getValidatedRequestBodyService,
    getFirebaseRefIdFromRequestService,
    mapper
  );

  describe('handle', () => {
    test('it handles', async () => {
      getValidatedRequestBodyService.handle = mockReturnValue(payload);
      getFirebaseRefIdFromRequestService.handle = mockReturnValue(firebaseRefId);
      mapper.map = mockReturnValue(dto);

      await expect(createSongRequestService.handle(req)).resolves.toStrictEqual(dto);
      expect(jest.spyOn(getValidatedRequestBodyService, 'handle')).toHaveBeenCalledWith(req, expect.anything());
      expect(jest.spyOn(getFirebaseRefIdFromRequestService, 'handle')).toHaveBeenCalledWith(req);
      expect(jest.spyOn(mapper, 'map')).toHaveBeenCalledWith(payload, firebaseRefId);
    });
  });
});
