import UserEmailInvalidException from '@exceptions/parameter-validation/UserEmailInvalidException';
import GetUserEmailFromBodyService from '@services/parameter-validation/GetUserEmailFromBodyService';
import {Request} from 'express';

describe('GetUserEmailFromBodyService', () => {
  const getUserEmailFromBodyService = new GetUserEmailFromBodyService();

  describe('handle', () => {
    describe('when email is invalid', () => {
      test.each([undefined, '', 'not-an-email', 'missing-at-sign.com'])(
        'it throws UserEmailInvalidException for %p',
        email => {
          const req = {body: {email}} as Request;

          expect(() => getUserEmailFromBodyService.handle(req)).toThrow(UserEmailInvalidException);
        }
      );
    });

    test('it handles', () => {
      const req = {body: {email: '  User@Example.com  '}} as Request;

      expect(getUserEmailFromBodyService.handle(req)).toStrictEqual('user@example.com');
    });
  });
});
