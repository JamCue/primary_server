import SetSongFavoriteRequestServiceDto from '@dtos/SetSongFavoriteRequestServiceDto';
import SetSongFavoriteDtoMapper from '@mappers/SetSongFavoriteDtoMapper';

describe('SetSongFavoriteDtoMapper', () => {
  const songId = '507f1f77bcf86cd799439011';
  const payload = {isFavorite: true};
  const firebaseRefId = 'firebaseRefId';

  const setSongFavoriteDtoMapper = new SetSongFavoriteDtoMapper();

  describe('map', () => {
    test('it handles', () => {
      const dto = setSongFavoriteDtoMapper.map(songId, payload, firebaseRefId);

      expect(dto).toStrictEqual(
        Object.assign(new SetSongFavoriteRequestServiceDto(), {songId, isFavorite: payload.isFavorite, firebaseRefId})
      );
    });
  });
});
