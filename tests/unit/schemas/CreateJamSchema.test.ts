import JamAudienceAccessEnum from '@enums/JamAudienceAccessEnum';
import JamSessionTypeEnum from '@enums/JamSessionTypeEnum';
import createJamSchema from '@schemas/CreateJamSchema';

describe('createJamSchema', () => {
  const validPayload = {
    title: 'Friday Night Jam',
    description: "Let's have a good night of music!",
    songs: [
      {songId: 'songId1', title: 'Tum Se Hi', artist: 'Mohit Chauhan', key: 'C', capo: 1},
      {songId: 'songId2', title: 'Choo Lo', artist: 'The Local Train', key: 'D', capo: 0},
    ],
    scheduledAt: '2026-05-17T19:30:00.000Z',
    location: 'Andheri West, Mumbai',
    sessionType: 'open',
    audienceAccess: 'anyone_can_request',
    strummingDisplay: true,
    showChords: true,
    capoDisplay: true,
    requestLimit: 3,
    autoAdvance: false,
  };

  test('it accepts a fully populated, valid payload', () => {
    const result = createJamSchema.safeParse(validPayload);

    expect(result).toMatchObject({
      success: true,
      data: {
        ...validPayload,
        scheduledAt: new Date(validPayload.scheduledAt),
        sessionType: JamSessionTypeEnum.OPEN,
        audienceAccess: JamAudienceAccessEnum.ANYONE_CAN_REQUEST,
      },
    });
  });

  test('it accepts a payload with only the required fields, defaulting the rest', () => {
    const result = createJamSchema.safeParse({
      title: 'Friday Night Jam',
      songs: [{songId: 'songId1', title: 'Tum Se Hi'}],
      scheduledAt: validPayload.scheduledAt,
    });

    expect(result).toMatchObject({
      success: true,
      data: {
        sessionType: JamSessionTypeEnum.OPEN,
        audienceAccess: JamAudienceAccessEnum.ANYONE_CAN_REQUEST,
        strummingDisplay: true,
        showChords: true,
        capoDisplay: true,
        requestLimit: 3,
        autoAdvance: false,
      },
    });
  });

  describe('when null or blank optional fields are sent', () => {
    test('it normalizes them to undefined instead of rejecting the payload', () => {
      const result = createJamSchema.safeParse({
        ...validPayload,
        description: '',
        location: null,
        songs: [{...validPayload.songs[0], artist: '', key: null}],
      });

      expect(result.success).toStrictEqual(true);
      if (result.success) {
        expect(result.data.description).toBeUndefined();
        expect(result.data.location).toBeUndefined();
        expect(result.data.songs[0].artist).toBeUndefined();
        expect(result.data.songs[0].key).toBeUndefined();
      }
    });
  });

  test.each([
    ['title', {...validPayload, title: ''}],
    ['songs', {...validPayload, songs: []}],
    ['songs.0.songId', {...validPayload, songs: [{...validPayload.songs[0], songId: ''}]}],
    ['songs.0.title', {...validPayload, songs: [{...validPayload.songs[0], title: ''}]}],
    ['songs.0.key', {...validPayload, songs: [{...validPayload.songs[0], key: 'H'}]}],
    ['songs.0.capo', {...validPayload, songs: [{...validPayload.songs[0], capo: 13}]}],
    ['scheduledAt', {...validPayload, scheduledAt: 'not-a-date'}],
    ['sessionType', {...validPayload, sessionType: 'members_only'}],
    ['audienceAccess', {...validPayload, audienceAccess: 'nobody'}],
    ['requestLimit', {...validPayload, requestLimit: 0}],
  ])('it rejects an invalid %s', (_field, payload) => {
    expect(createJamSchema.safeParse(payload).success).toStrictEqual(false);
  });
});
