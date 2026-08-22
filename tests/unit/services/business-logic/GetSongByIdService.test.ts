import GetSongByIdRequestServiceDto from '@dtos/GetSongByIdRequestServiceDto';
import SongSourceEnum from '@enums/SongSourceEnum';
import SongNotFoundException from '@exceptions/SongNotFoundException';
import SongRepository from '@repositories/SongRepository';
import GetMusicianByFirebaseRefIdService from '@services/business-logic/GetMusicianByFirebaseRefIdService';
import GetSongByIdService from '@services/business-logic/GetSongByIdService';
import SongType from '@t/SongType';
import UserType from '@t/UserType';
import HttpResponseOk from '@value-objects/HttpResponseOk';

import mockResolvedValue from '../../utils/mockResolvedValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('GetSongByIdService', () => {
  const dto = Object.assign(new GetSongByIdRequestServiceDto(), {
    songId: '507f1f77bcf86cd799439011',
    firebaseRefId: 'firebaseRefId',
  });
  const musician = {id: 'musicianId', name: 'name', email: 'user@example.com'} as UserType;
  const song = {id: dto.songId, musicianId: musician.id, title: 'Offo', source: SongSourceEnum.PDF} as SongType;

  const getMusicianByFirebaseRefIdService = new GetMusicianByFirebaseRefIdService();
  const songRepository = new SongRepository();
  const getSongByIdService = new GetSongByIdService(getMusicianByFirebaseRefIdService, songRepository);

  describe('handle', () => {
    describe('when no song is found for that id', () => {
      test('it throws SongNotFoundException', async () => {
        getMusicianByFirebaseRefIdService.handle = mockResolvedValue(musician);
        songRepository.getById = mockResolvedValue(null);

        await expect(getSongByIdService.handle(dto)).rejects.toBeInstanceOf(SongNotFoundException);
      });
    });

    describe('when the song belongs to a different musician', () => {
      test('it throws SongNotFoundException', async () => {
        getMusicianByFirebaseRefIdService.handle = mockResolvedValue(musician);
        songRepository.getById = mockResolvedValue({...song, musicianId: 'someone-else'});

        await expect(getSongByIdService.handle(dto)).rejects.toBeInstanceOf(SongNotFoundException);
      });
    });

    test('it handles', async () => {
      getMusicianByFirebaseRefIdService.handle = mockResolvedValue(musician);
      songRepository.getById = mockResolvedValue(song);

      await expect(getSongByIdService.handle(dto)).resolves.toStrictEqual(new HttpResponseOk(song));
      expect(jest.spyOn(songRepository, 'getById')).toHaveBeenCalledWith(dto.songId);
    });
  });
});
