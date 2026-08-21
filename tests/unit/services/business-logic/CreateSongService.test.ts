import CreateSongRequestServiceDto from '@dtos/CreateSongRequestServiceDto';
import SongSourceEnum from '@enums/SongSourceEnum';
import GetUserByFirebaseRefIdServiceException from '@exceptions/inner/GetUserByFirebaseRefIdServiceException';
import UserNotFoundException from '@exceptions/UserNotFoundException';
import UserRepository from '@repositories/UserRepository';
import CreateSongService from '@services/business-logic/CreateSongService';
import ExtractChordsFromSheetContentService from '@services/business-logic/ExtractChordsFromSheetContentService';
import SaveSongService from '@services/business-logic/SaveSongService';
import SongType from '@t/SongType';
import UserType from '@t/UserType';
import HttpResponseCreated from '@value-objects/HttpResponseCreated';

import mockImplementation from '../../utils/mockImplementation';
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
    createdAt: new Date(),
    updatedAt: new Date(),
  } as SongType;

  const userRepository = new UserRepository();
  const extractChordsFromSheetContentService = new ExtractChordsFromSheetContentService();
  const saveSongService = new SaveSongService();
  const createSongService = new CreateSongService(
    userRepository,
    extractChordsFromSheetContentService,
    saveSongService
  );

  describe('handle', () => {
    describe('when userRepository fails', () => {
      test('it throws GetUserByFirebaseRefIdServiceException', async () => {
        userRepository.getByFirebaseRefId = mockImplementation(() => {
          throw new Error();
        });

        await expect(createSongService.handle(dto)).rejects.toBeInstanceOf(GetUserByFirebaseRefIdServiceException);
        expect(jest.spyOn(saveSongService, 'handle')).toHaveBeenCalledTimes(0);
      });
    });

    describe('when no musician is found for the authenticated request', () => {
      test('it throws UserNotFoundException', async () => {
        userRepository.getByFirebaseRefId = mockResolvedValue(null);

        await expect(createSongService.handle(dto)).rejects.toBeInstanceOf(UserNotFoundException);
        expect(jest.spyOn(saveSongService, 'handle')).toHaveBeenCalledTimes(0);
      });
    });

    test('it handles', async () => {
      userRepository.getByFirebaseRefId = mockResolvedValue(musician);
      extractChordsFromSheetContentService.handle = mockReturnValue(chords);
      saveSongService.handle = mockResolvedValue(song);

      await expect(createSongService.handle(dto)).resolves.toStrictEqual(new HttpResponseCreated(song));
      expect(jest.spyOn(userRepository, 'getByFirebaseRefId')).toHaveBeenCalledWith(dto.firebaseRefId);
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
      });
    });
  });
});
