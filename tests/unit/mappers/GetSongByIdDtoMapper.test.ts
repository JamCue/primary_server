import GetSongByIdRequestServiceDto from '@dtos/GetSongByIdRequestServiceDto';
import GetSongByIdDtoMapper from '@mappers/GetSongByIdDtoMapper';

describe('GetSongByIdDtoMapper', () => {
  const songId = '507f1f77bcf86cd799439011';
  const firebaseRefId = 'firebaseRefId';

  const getSongByIdDtoMapper = new GetSongByIdDtoMapper();

  describe('map', () => {
    test('it handles', () => {
      const dto = getSongByIdDtoMapper.map(songId, firebaseRefId);

      expect(dto).toStrictEqual(Object.assign(new GetSongByIdRequestServiceDto(), {songId, firebaseRefId}));
    });
  });
});
