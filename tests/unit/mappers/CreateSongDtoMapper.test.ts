import CreateSongRequestServiceDto from '@dtos/CreateSongRequestServiceDto';
import SongSourceEnum from '@enums/SongSourceEnum';
import CreateSongDtoMapper from '@mappers/CreateSongDtoMapper';

describe('CreateSongDtoMapper', () => {
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
  const firebaseRefId = 'firebaseRefId';

  const createSongDtoMapper = new CreateSongDtoMapper();

  describe('map', () => {
    test('it handles', () => {
      const dto = createSongDtoMapper.map(payload, firebaseRefId);

      expect(dto).toStrictEqual(Object.assign(new CreateSongRequestServiceDto(), payload, {firebaseRefId}));
    });
  });
});
