import SongSourceEnum from '@enums/SongSourceEnum';
import createSongSchema from '@schemas/CreateSongSchema';

describe('createSongSchema', () => {
  const validPayload = {
    title: 'Offo',
    artist: 'Amit Trivedi',
    key: 'Eb',
    capo: 0,
    tempo: 120,
    timeSignature: '4/4',
    strummingPattern: 'D D U U D U',
    sheetContent: 'Eb              Fm     Bb\nOffo! Isey.. isey daant ke bhagaaun',
    source: 'pdf',
  };

  test('it accepts a fully populated, valid payload', () => {
    const result = createSongSchema.safeParse(validPayload);

    expect(result).toMatchObject({success: true, data: {...validPayload, source: SongSourceEnum.PDF}});
  });

  test('it accepts a payload with only the required fields', () => {
    const result = createSongSchema.safeParse({
      title: 'Offo',
      sheetContent: validPayload.sheetContent,
      source: 'manual',
    });

    expect(result.success).toStrictEqual(true);
  });

  describe('when null or blank optional fields are sent', () => {
    test('it normalizes them to undefined instead of rejecting the payload', () => {
      const result = createSongSchema.safeParse({
        ...validPayload,
        artist: '',
        key: null,
        timeSignature: '',
      });

      expect(result.success).toStrictEqual(true);
      if (result.success) {
        expect(result.data.artist).toBeUndefined();
        expect(result.data.key).toBeUndefined();
        expect(result.data.timeSignature).toBeUndefined();
      }
    });
  });

  describe('when the boundary capo value 0 is sent', () => {
    test('it accepts it', () => {
      const result = createSongSchema.safeParse({...validPayload, capo: 0});

      expect(result).toMatchObject({success: true, data: {capo: 0}});
    });
  });

  test.each([
    ['title', {...validPayload, title: ''}],
    ['sheetContent', {...validPayload, sheetContent: ''}],
    ['source', {...validPayload, source: 'scan'}],
    ['key', {...validPayload, key: 'H'}],
    ['capo', {...validPayload, capo: 13}],
    ['capo', {...validPayload, capo: 1.5}],
    ['tempo', {...validPayload, tempo: 19}],
    ['timeSignature', {...validPayload, timeSignature: '4-4'}],
  ])('it rejects an invalid %s', (_field, payload) => {
    expect(createSongSchema.safeParse(payload).success).toStrictEqual(false);
  });
});
