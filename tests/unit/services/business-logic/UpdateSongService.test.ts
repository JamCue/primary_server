import UpdateSongRequestServiceDto from '@dtos/UpdateSongRequestServiceDto';
import SongSourceEnum from '@enums/SongSourceEnum';
import SongNotFoundException from '@exceptions/SongNotFoundException';
import SongRepository from '@repositories/SongRepository';
import ExtractChordsFromSheetContentService from '@services/business-logic/ExtractChordsFromSheetContentService';
import GetMusicianByFirebaseRefIdService from '@services/business-logic/GetMusicianByFirebaseRefIdService';
import UpdateSongService from '@services/business-logic/UpdateSongService';
import SongType from '@t/SongType';
import UserType from '@t/UserType';
import HttpResponseOk from '@value-objects/HttpResponseOk';

import mockResolvedValue from '../../utils/mockResolvedValue';
import mockReturnValue from '../../utils/mockReturnValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('UpdateSongService', () => {
  const dto = Object.assign(new UpdateSongRequestServiceDto(), {
    songId: '507f1f77bcf86cd799439011',
    title: 'Offo (edited)',
    sheetContent: 'Eb\nOffo! Isey.. isey daant ke bhagaaun',
    firebaseRefId: 'firebaseRefId',
  });
  const musician = {id: 'musicianId', name: 'name', email: 'user@example.com'} as UserType;
  const song = {id: dto.songId, musicianId: musician.id, title: 'Offo', source: SongSourceEnum.PDF} as SongType;
  const chords = ['Eb'];
  const updatedSong = {...song, title: dto.title, sheetContent: dto.sheetContent, chords};

  const getMusicianByFirebaseRefIdService = new GetMusicianByFirebaseRefIdService();
  const extractChordsFromSheetContentService = new ExtractChordsFromSheetContentService();
  const songRepository = new SongRepository();
  const updateSongService = new UpdateSongService(
    getMusicianByFirebaseRefIdService,
    extractChordsFromSheetContentService,
    songRepository
  );

  describe('handle', () => {
    describe('when no song is found for that id', () => {
      test('it throws SongNotFoundException', async () => {
        getMusicianByFirebaseRefIdService.handle = mockResolvedValue(musician);
        songRepository.getById = mockResolvedValue(null);

        await expect(updateSongService.handle(dto)).rejects.toBeInstanceOf(SongNotFoundException);
        expect(jest.spyOn(songRepository, 'update')).toHaveBeenCalledTimes(0);
      });
    });

    describe('when the song belongs to a different musician', () => {
      test('it throws SongNotFoundException', async () => {
        getMusicianByFirebaseRefIdService.handle = mockResolvedValue(musician);
        songRepository.getById = mockResolvedValue({...song, musicianId: 'someone-else'});

        await expect(updateSongService.handle(dto)).rejects.toBeInstanceOf(SongNotFoundException);
        expect(jest.spyOn(songRepository, 'update')).toHaveBeenCalledTimes(0);
      });
    });

    test('it re-extracts chords from the (possibly changed) sheetContent and saves', async () => {
      getMusicianByFirebaseRefIdService.handle = mockResolvedValue(musician);
      songRepository.getById = mockResolvedValue(song);
      extractChordsFromSheetContentService.handle = mockReturnValue(chords);
      songRepository.update = mockResolvedValue(updatedSong);

      await expect(updateSongService.handle(dto)).resolves.toStrictEqual(new HttpResponseOk(updatedSong));
      expect(jest.spyOn(extractChordsFromSheetContentService, 'handle')).toHaveBeenCalledWith(dto.sheetContent);
      expect(jest.spyOn(songRepository, 'update')).toHaveBeenCalledWith(dto.songId, {
        title: dto.title,
        artist: dto.artist,
        key: dto.key,
        capo: dto.capo,
        tempo: dto.tempo,
        timeSignature: dto.timeSignature,
        strummingPattern: dto.strummingPattern,
        sheetContent: dto.sheetContent,
        chords,
      });
    });
  });
});
