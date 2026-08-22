import CreateJamRequestServiceDto from '@dtos/CreateJamRequestServiceDto';
import JamAudienceAccessEnum from '@enums/JamAudienceAccessEnum';
import JamJoinOptionEnum from '@enums/JamJoinOptionEnum';
import JamSessionTypeEnum from '@enums/JamSessionTypeEnum';
import CreateJamService from '@services/business-logic/CreateJamService';
import GenerateJamJoinCodeService from '@services/business-logic/GenerateJamJoinCodeService';
import GetMusicianByFirebaseRefIdService from '@services/business-logic/GetMusicianByFirebaseRefIdService';
import SaveJamService from '@services/business-logic/SaveJamService';
import JamType from '@t/JamType';
import UserType from '@t/UserType';
import HttpResponseCreated from '@value-objects/HttpResponseCreated';

import mockResolvedValue from '../../utils/mockResolvedValue';
import mockReturnValue from '../../utils/mockReturnValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('CreateJamService', () => {
  const dto = Object.assign(new CreateJamRequestServiceDto(), {
    title: 'Friday Night Jam',
    description: "Let's have a good night of music!",
    songs: [{songId: 'songId1', title: 'Tum Se Hi', artist: 'Mohit Chauhan', key: 'C', capo: 1}],
    scheduledAt: new Date('2026-05-17T19:30:00.000Z'),
    location: 'Andheri West, Mumbai',
    sessionType: JamSessionTypeEnum.OPEN,
    audienceAccess: JamAudienceAccessEnum.ANYONE_CAN_REQUEST,
    strummingDisplay: true,
    showChords: true,
    capoDisplay: true,
    requestLimit: 3,
    autoAdvance: false,
    firebaseRefId: 'firebaseRefId',
  });
  const musician = {id: 'musicianId', name: 'name', email: 'user@example.com'} as UserType;
  const joinCode = 'AB12CD';
  const jam = {
    id: 'id',
    musicianId: musician.id,
    ...dto,
    joinOption: JamJoinOptionEnum.QR_AND_LINK,
    joinCode,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as JamType;

  const getMusicianByFirebaseRefIdService = new GetMusicianByFirebaseRefIdService();
  const generateJamJoinCodeService = new GenerateJamJoinCodeService();
  const saveJamService = new SaveJamService();
  const createJamService = new CreateJamService(
    getMusicianByFirebaseRefIdService,
    generateJamJoinCodeService,
    saveJamService
  );

  describe('handle', () => {
    test('it handles', async () => {
      getMusicianByFirebaseRefIdService.handle = mockResolvedValue(musician);
      generateJamJoinCodeService.handle = mockReturnValue(joinCode);
      saveJamService.handle = mockResolvedValue(jam);

      await expect(createJamService.handle(dto)).resolves.toStrictEqual(new HttpResponseCreated(jam));
      expect(jest.spyOn(getMusicianByFirebaseRefIdService, 'handle')).toHaveBeenCalledWith(dto.firebaseRefId);
      expect(jest.spyOn(saveJamService, 'handle')).toHaveBeenCalledWith({
        musicianId: musician.id,
        title: dto.title,
        description: dto.description,
        songs: dto.songs,
        scheduledAt: dto.scheduledAt,
        location: dto.location,
        sessionType: dto.sessionType,
        audienceAccess: dto.audienceAccess,
        joinOption: JamJoinOptionEnum.QR_AND_LINK,
        strummingDisplay: dto.strummingDisplay,
        showChords: dto.showChords,
        capoDisplay: dto.capoDisplay,
        requestLimit: dto.requestLimit,
        autoAdvance: dto.autoAdvance,
        joinCode,
      });
    });
  });
});
