import CreateJamRequestServiceDto from '@dtos/CreateJamRequestServiceDto';
import JamAudienceAccessEnum from '@enums/JamAudienceAccessEnum';
import JamSessionTypeEnum from '@enums/JamSessionTypeEnum';
import CreateJamDtoMapper from '@mappers/CreateJamDtoMapper';

describe('CreateJamDtoMapper', () => {
  const payload = {
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
  };
  const firebaseRefId = 'firebaseRefId';

  const createJamDtoMapper = new CreateJamDtoMapper();

  describe('map', () => {
    test('it handles', () => {
      const dto = createJamDtoMapper.map(payload, firebaseRefId);

      expect(dto).toStrictEqual(Object.assign(new CreateJamRequestServiceDto(), payload, {firebaseRefId}));
    });
  });
});
