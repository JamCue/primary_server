import JamIdInvalidException from '@exceptions/parameter-validation/JamIdInvalidException';
import GetJamIdFromParamService from '@services/parameter-validation/GetJamIdFromParamService';
import {Request} from 'express';

describe('GetJamIdFromParamService', () => {
  const getJamIdFromParamService = new GetJamIdFromParamService();

  describe('handle', () => {
    describe('when jamId is invalid', () => {
      test.each([undefined, '', 'not-an-object-id', '123', 'a'.repeat(25)])(
        'it throws JamIdInvalidException for %p',
        jamId => {
          const req = {params: {jamId}} as unknown as Request;

          expect(() => getJamIdFromParamService.handle(req)).toThrow(JamIdInvalidException);
        }
      );
    });

    test('it handles', () => {
      const jamId = '507f1f77bcf86cd799439011';
      const req = {params: {jamId}} as unknown as Request;

      expect(getJamIdFromParamService.handle(req)).toStrictEqual(jamId);
    });

    test('it accepts uppercase hex characters', () => {
      const jamId = '507F1F77BCF86CD799439011';
      const req = {params: {jamId}} as unknown as Request;

      expect(getJamIdFromParamService.handle(req)).toStrictEqual(jamId);
    });
  });
});
