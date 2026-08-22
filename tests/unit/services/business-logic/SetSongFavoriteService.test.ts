import SetSongFavoriteRequestServiceDto from '@dtos/SetSongFavoriteRequestServiceDto';
import SongSourceEnum from '@enums/SongSourceEnum';
import SongNotFoundException from '@exceptions/SongNotFoundException';
import SongRepository from '@repositories/SongRepository';
import GetMusicianByFirebaseRefIdService from '@services/business-logic/GetMusicianByFirebaseRefIdService';
import SetSongFavoriteService from '@services/business-logic/SetSongFavoriteService';
import SongType from '@t/SongType';
import UserType from '@t/UserType';
import HttpResponseOk from '@value-objects/HttpResponseOk';

import mockResolvedValue from '../../utils/mockResolvedValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('SetSongFavoriteService', () => {
  const dto = Object.assign(new SetSongFavoriteRequestServiceDto(), {
    songId: '507f1f77bcf86cd799439011',
    isFavorite: true,
    firebaseRefId: 'firebaseRefId',
  });
  const musician = {id: 'musicianId', name: 'name', email: 'user@example.com'} as UserType;
  const song = {id: dto.songId, musicianId: musician.id, title: 'Offo', source: SongSourceEnum.PDF} as SongType;
  const updatedSong = {...song, isFavorite: true};

  const getMusicianByFirebaseRefIdService = new GetMusicianByFirebaseRefIdService();
  const songRepository = new SongRepository();
  const setSongFavoriteService = new SetSongFavoriteService(getMusicianByFirebaseRefIdService, songRepository);

  describe('handle', () => {
    describe('when no song is found for that id', () => {
      test('it throws SongNotFoundException', async () => {
        getMusicianByFirebaseRefIdService.handle = mockResolvedValue(musician);
        songRepository.getById = mockResolvedValue(null);

        await expect(setSongFavoriteService.handle(dto)).rejects.toBeInstanceOf(SongNotFoundException);
        expect(jest.spyOn(songRepository, 'updateFavorite')).toHaveBeenCalledTimes(0);
      });
    });

    describe('when the song belongs to a different musician', () => {
      test('it throws SongNotFoundException', async () => {
        getMusicianByFirebaseRefIdService.handle = mockResolvedValue(musician);
        songRepository.getById = mockResolvedValue({...song, musicianId: 'someone-else'});

        await expect(setSongFavoriteService.handle(dto)).rejects.toBeInstanceOf(SongNotFoundException);
        expect(jest.spyOn(songRepository, 'updateFavorite')).toHaveBeenCalledTimes(0);
      });
    });

    test('it handles', async () => {
      getMusicianByFirebaseRefIdService.handle = mockResolvedValue(musician);
      songRepository.getById = mockResolvedValue(song);
      songRepository.updateFavorite = mockResolvedValue(updatedSong);

      await expect(setSongFavoriteService.handle(dto)).resolves.toStrictEqual(new HttpResponseOk(updatedSong));
      expect(jest.spyOn(songRepository, 'getById')).toHaveBeenCalledWith(dto.songId);
      expect(jest.spyOn(songRepository, 'updateFavorite')).toHaveBeenCalledWith(dto.songId, dto.isFavorite);
    });
  });
});
