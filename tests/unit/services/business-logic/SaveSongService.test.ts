import SongSourceEnum from '@enums/SongSourceEnum';
import DbException from '@exceptions/inner/DbException';
import SaveSongServiceException from '@exceptions/inner/SaveSongServiceException';
import SongRepository from '@repositories/SongRepository';
import SaveSongService from '@services/business-logic/SaveSongService';
import CreateSongPayloadType from '@t/CreateSongPayloadType';
import SongType from '@t/SongType';

import mockImplementation from '../../utils/mockImplementation';
import mockResolvedValue from '../../utils/mockResolvedValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('SaveSongService', () => {
  const payload: CreateSongPayloadType = {
    musicianId: 'musicianId',
    title: 'Offo',
    artist: 'Amit Trivedi',
    key: 'Eb',
    capo: 0,
    tempo: 120,
    timeSignature: '4/4',
    strummingPattern: 'D D U U D U',
    sheetContent: 'Eb              Fm     Bb\nOffo! Isey.. isey daant ke bhagaaun',
    chords: ['Eb', 'Fm', 'Bb'],
    source: SongSourceEnum.PDF,
    isFavorite: false,
  };
  const song = {id: 'id', ...payload, createdAt: new Date(), updatedAt: new Date()} as SongType;

  const songRepository = new SongRepository();
  const saveSongService = new SaveSongService(songRepository);

  describe('handle', () => {
    describe('when songRepository fails', () => {
      test('it throws SaveSongServiceException', async () => {
        songRepository.save = mockImplementation(() => {
          throw new DbException(new Error());
        });

        await expect(saveSongService.handle(payload)).rejects.toBeInstanceOf(SaveSongServiceException);
      });
    });

    test('it handles', async () => {
      songRepository.save = mockResolvedValue(song);

      await expect(saveSongService.handle(payload)).resolves.toStrictEqual(song);
      expect(jest.spyOn(songRepository, 'save')).toHaveBeenCalledWith(payload);
    });
  });
});
