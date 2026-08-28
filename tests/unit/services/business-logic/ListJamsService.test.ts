import ListJamsRequestServiceDto from '@dtos/ListJamsRequestServiceDto';
import JamAudienceAccessEnum from '@enums/JamAudienceAccessEnum';
import JamJoinOptionEnum from '@enums/JamJoinOptionEnum';
import JamSessionTypeEnum from '@enums/JamSessionTypeEnum';
import JamRepository from '@repositories/JamRepository';
import GetMusicianByFirebaseRefIdService from '@services/business-logic/GetMusicianByFirebaseRefIdService';
import ListJamsService from '@services/business-logic/ListJamsService';
import JamType from '@t/JamType';
import UserType from '@t/UserType';
import HttpResponseOk from '@value-objects/HttpResponseOk';

import mockResolvedValue from '../../utils/mockResolvedValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('ListJamsService', () => {
  const dto = Object.assign(new ListJamsRequestServiceDto(), {
    when: 'upcoming' as const,
    page: 2,
    limit: 10,
    firebaseRefId: 'firebaseRefId',
  });
  const musician = {id: 'musicianId', name: 'name', email: 'user@example.com'} as UserType;
  const jams = [
    {
      id: 'id',
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
    } as JamType,
  ];

  const getMusicianByFirebaseRefIdService = new GetMusicianByFirebaseRefIdService();
  const jamRepository = new JamRepository();
  const listJamsService = new ListJamsService(getMusicianByFirebaseRefIdService, jamRepository);

  describe('handle', () => {
    test('it handles', async () => {
      getMusicianByFirebaseRefIdService.handle = mockResolvedValue(musician);
      jamRepository.list = mockResolvedValue({jams, total: 1});

      await expect(listJamsService.handle(dto)).resolves.toStrictEqual(
        new HttpResponseOk({jams, total: 1, page: dto.page, limit: dto.limit})
      );
      expect(jest.spyOn(getMusicianByFirebaseRefIdService, 'handle')).toHaveBeenCalledWith(dto.firebaseRefId);
      expect(jest.spyOn(jamRepository, 'list')).toHaveBeenCalledWith({
        musicianId: musician.id,
        when: dto.when,
        page: dto.page,
        limit: dto.limit,
      });
    });
  });
});
