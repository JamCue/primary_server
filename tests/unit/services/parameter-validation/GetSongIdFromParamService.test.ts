import SongIdInvalidException from '@exceptions/parameter-validation/SongIdInvalidException';
import GetSongIdFromParamService from '@services/parameter-validation/GetSongIdFromParamService';
import {Request} from 'express';

describe('GetSongIdFromParamService', () => {
  const getSongIdFromParamService = new GetSongIdFromParamService();

  describe('handle', () => {
    describe('when songId is invalid', () => {
      test.each([undefined, '', 'not-an-object-id', '123', 'a'.repeat(25)])(
        'it throws SongIdInvalidException for %p',
        songId => {
          const req = {params: {songId}} as unknown as Request;

          expect(() => getSongIdFromParamService.handle(req)).toThrow(SongIdInvalidException);
        }
      );
    });

    test('it handles', () => {
      const songId = '507f1f77bcf86cd799439011';
      const req = {params: {songId}} as unknown as Request;

      expect(getSongIdFromParamService.handle(req)).toStrictEqual(songId);
    });

    test('it accepts uppercase hex characters', () => {
      const songId = '507F1F77BCF86CD799439011';
      const req = {params: {songId}} as unknown as Request;

      expect(getSongIdFromParamService.handle(req)).toStrictEqual(songId);
    });
  });
});
