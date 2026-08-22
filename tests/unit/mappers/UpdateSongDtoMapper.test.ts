import UpdateSongRequestServiceDto from '@dtos/UpdateSongRequestServiceDto';
import UpdateSongDtoMapper from '@mappers/UpdateSongDtoMapper';

describe('UpdateSongDtoMapper', () => {
  const songId = '507f1f77bcf86cd799439011';
  const payload = {
    title: 'Offo',
    artist: 'Amit Trivedi',
    key: 'Eb',
    capo: 0,
    tempo: 120,
    timeSignature: '4/4',
    strummingPattern: 'D D U U D U',
    sheetContent: 'Eb              Fm     Bb\nOffo! Isey.. isey daant ke bhagaaun',
  };
  const firebaseRefId = 'firebaseRefId';

  const updateSongDtoMapper = new UpdateSongDtoMapper();

  describe('map', () => {
    test('it handles', () => {
      const dto = updateSongDtoMapper.map(songId, payload, firebaseRefId);

      expect(dto).toStrictEqual(Object.assign(new UpdateSongRequestServiceDto(), {songId, ...payload, firebaseRefId}));
    });
  });
});
