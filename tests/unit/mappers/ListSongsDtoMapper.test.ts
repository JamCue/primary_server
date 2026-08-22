import ListSongsRequestServiceDto from '@dtos/ListSongsRequestServiceDto';
import ListSongsDtoMapper from '@mappers/ListSongsDtoMapper';

describe('ListSongsDtoMapper', () => {
  const query = {search: 'wonder', key: 'G', favorite: true, sort: 'recent' as const, page: 2, limit: 10};
  const firebaseRefId = 'firebaseRefId';

  const listSongsDtoMapper = new ListSongsDtoMapper();

  describe('map', () => {
    test('it handles', () => {
      const dto = listSongsDtoMapper.map(query, firebaseRefId);

      expect(dto).toStrictEqual(Object.assign(new ListSongsRequestServiceDto(), query, {firebaseRefId}));
    });
  });
});
