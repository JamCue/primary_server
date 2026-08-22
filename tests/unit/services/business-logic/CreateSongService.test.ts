import CreateSongRequestServiceDto from '@dtos/CreateSongRequestServiceDto';
import SongSourceEnum from '@enums/SongSourceEnum';
import CreateSongService from '@services/business-logic/CreateSongService';
import ExtractChordsFromSheetContentService from '@services/business-logic/ExtractChordsFromSheetContentService';
import GetMusicianByFirebaseRefIdService from '@services/business-logic/GetMusicianByFirebaseRefIdService';
import SaveSongService from '@services/business-logic/SaveSongService';
import SongType from '@t/SongType';
import UserType from '@t/UserType';
import HttpResponseCreated from '@value-objects/HttpResponseCreated';

import mockResolvedValue from '../../utils/mockResolvedValue';
import mockReturnValue from '../../utils/mockReturnValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('CreateSongService', () => {
  const dto = Object.assign(new CreateSongRequestServiceDto(), {
    title: 'Offo',
    artist: 'Amit Trivedi',
    key: 'Eb',
    capo: 0,
    tempo: 120,
    timeSignature: '4/4',
    strummingPattern: 'D D U U D U',
    sheetContent: 'Eb              Fm     Bb\nOffo! Isey.. isey daant ke bhagaaun',
    source: SongSourceEnum.PDF,
    firebaseRefId: 'firebaseRefId',
  });
  const musician = {id: 'musicianId', name: 'name', email: 'user@example.com'} as UserType;
  const chords = ['Eb', 'Fm', 'Bb'];
  const song = {
    id: 'id',
    musicianId: musician.id,
    ...dto,
    chords,
    isFavorite: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as SongType;

  const getMusicianByFirebaseRefIdService = new GetMusicianByFirebaseRefIdService();
  const extractChordsFromSheetContentService = new ExtractChordsFromSheetContentService();
  const saveSongService = new SaveSongService();
  const createSongService = new CreateSongService(
    getMusicianByFirebaseRefIdService,
    extractChordsFromSheetContentService,
    saveSongService
  );

  describe('handle', () => {
    test('it handles', async () => {
      getMusicianByFirebaseRefIdService.handle = mockResolvedValue(musician);
      extractChordsFromSheetContentService.handle = mockReturnValue(chords);
      saveSongService.handle = mockResolvedValue(song);

      await expect(createSongService.handle(dto)).resolves.toStrictEqual(new HttpResponseCreated(song));
      expect(jest.spyOn(getMusicianByFirebaseRefIdService, 'handle')).toHaveBeenCalledWith(dto.firebaseRefId);
      expect(jest.spyOn(extractChordsFromSheetContentService, 'handle')).toHaveBeenCalledWith(dto.sheetContent);
      expect(jest.spyOn(saveSongService, 'handle')).toHaveBeenCalledWith({
        musicianId: musician.id,
        title: dto.title,
        artist: dto.artist,
        key: dto.key,
        capo: dto.capo,
        tempo: dto.tempo,
        timeSignature: dto.timeSignature,
        strummingPattern: dto.strummingPattern,
        sheetContent: dto.sheetContent,
        chords,
        source: dto.source,
        isFavorite: false,
      });
    });
  });
});
