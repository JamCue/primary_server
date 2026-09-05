import GetJamByIdRequestServiceDto from '@dtos/GetJamByIdRequestServiceDto';
import JamAudienceAccessEnum from '@enums/JamAudienceAccessEnum';
import JamJoinOptionEnum from '@enums/JamJoinOptionEnum';
import JamSessionTypeEnum from '@enums/JamSessionTypeEnum';
import JamNotFoundException from '@exceptions/JamNotFoundException';
import JamRepository from '@repositories/JamRepository';
import GetJamByIdService from '@services/business-logic/GetJamByIdService';
import GetMusicianByFirebaseRefIdService from '@services/business-logic/GetMusicianByFirebaseRefIdService';
import JamType from '@t/JamType';
import UserType from '@t/UserType';
import HttpResponseOk from '@value-objects/HttpResponseOk';

import mockResolvedValue from '../../utils/mockResolvedValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('GetJamByIdService', () => {
  const dto = Object.assign(new GetJamByIdRequestServiceDto(), {
    jamId: '507f1f77bcf86cd799439011',
    firebaseRefId: 'firebaseRefId',
  });
  const musician = {id: 'musicianId', name: 'name', email: 'user@example.com'} as UserType;
  const jam = {
    id: dto.jamId,
    musicianId: musician.id,
    title: 'Friday Night Jam',
    songs: [],
    scheduledAt: new Date('2026-05-17T19:30:00.000Z'),
    sessionType: JamSessionTypeEnum.OPEN,
    audienceAccess: JamAudienceAccessEnum.ANYONE_CAN_REQUEST,
    joinOption: JamJoinOptionEnum.QR_AND_LINK,
    strummingDisplay: true,
    showChords: true,
    capoDisplay: true,
    requestLimit: 3,
    autoAdvance: false,
    joinCode: 'AB12CD',
    createdAt: new Date(),
    updatedAt: new Date(),
  } as JamType;

  const getMusicianByFirebaseRefIdService = new GetMusicianByFirebaseRefIdService();
  const jamRepository = new JamRepository();
  const getJamByIdService = new GetJamByIdService(getMusicianByFirebaseRefIdService, jamRepository);

  describe('handle', () => {
    describe('when no jam is found for that id', () => {
      test('it throws JamNotFoundException', async () => {
        getMusicianByFirebaseRefIdService.handle = mockResolvedValue(musician);
        jamRepository.getById = mockResolvedValue(null);

        await expect(getJamByIdService.handle(dto)).rejects.toBeInstanceOf(JamNotFoundException);
      });
    });

    describe('when the jam belongs to a different musician', () => {
      test('it throws JamNotFoundException', async () => {
        getMusicianByFirebaseRefIdService.handle = mockResolvedValue(musician);
        jamRepository.getById = mockResolvedValue({...jam, musicianId: 'someone-else'});

        await expect(getJamByIdService.handle(dto)).rejects.toBeInstanceOf(JamNotFoundException);
      });
    });

    test('it handles', async () => {
      getMusicianByFirebaseRefIdService.handle = mockResolvedValue(musician);
      jamRepository.getById = mockResolvedValue(jam);

      await expect(getJamByIdService.handle(dto)).resolves.toStrictEqual(new HttpResponseOk(jam));
      expect(jest.spyOn(jamRepository, 'getById')).toHaveBeenCalledWith(dto.jamId);
    });
  });
});
