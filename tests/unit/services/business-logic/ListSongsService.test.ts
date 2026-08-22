import ListSongsRequestServiceDto from '@dtos/ListSongsRequestServiceDto';
import SongSourceEnum from '@enums/SongSourceEnum';
import SongRepository from '@repositories/SongRepository';
import GetMusicianByFirebaseRefIdService from '@services/business-logic/GetMusicianByFirebaseRefIdService';
import ListSongsService from '@services/business-logic/ListSongsService';
import SongType from '@t/SongType';
import UserType from '@t/UserType';
import HttpResponseOk from '@value-objects/HttpResponseOk';

import mockResolvedValue from '../../utils/mockResolvedValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('ListSongsService', () => {
  const dto = Object.assign(new ListSongsRequestServiceDto(), {
    search: 'wonder',
    key: 'G',
    favorite: true,
    sort: 'recent',
    page: 2,
    limit: 10,
    firebaseRefId: 'firebaseRefId',
  });
  const musician = {id: 'musicianId', name: 'name', email: 'user@example.com'} as UserType;
  const songs = [{id: 'id', musicianId: musician.id, title: 'Wonderwall', source: SongSourceEnum.MANUAL} as SongType];

  const getMusicianByFirebaseRefIdService = new GetMusicianByFirebaseRefIdService();
  const songRepository = new SongRepository();
  const listSongsService = new ListSongsService(getMusicianByFirebaseRefIdService, songRepository);

  describe('handle', () => {
    test('it handles', async () => {
      getMusicianByFirebaseRefIdService.handle = mockResolvedValue(musician);
      songRepository.list = mockResolvedValue({songs, total: 1});

      await expect(listSongsService.handle(dto)).resolves.toStrictEqual(
        new HttpResponseOk({songs, total: 1, page: dto.page, limit: dto.limit})
      );
      expect(jest.spyOn(getMusicianByFirebaseRefIdService, 'handle')).toHaveBeenCalledWith(dto.firebaseRefId);
      expect(jest.spyOn(songRepository, 'list')).toHaveBeenCalledWith({
        musicianId: musician.id,
        search: dto.search,
        key: dto.key,
        favorite: dto.favorite,
        sort: dto.sort,
        page: dto.page,
        limit: dto.limit,
      });
    });
  });
});
