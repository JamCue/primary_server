import UserEmailInvalidException from '@exceptions/parameter-validation/UserEmailInvalidException';
import GetUserEmailFromQueryService from '@services/parameter-validation/GetUserEmailFromQueryService';
import {Request} from 'express';

describe('GetUserEmailFromQueryService', () => {
  const getUserEmailFromQueryService = new GetUserEmailFromQueryService();

  describe('handle', () => {
    describe('when email is invalid', () => {
      test.each([undefined, '', 'not-an-email', 'missing-at-sign.com'])(
        'it throws UserEmailInvalidException for %p',
        email => {
          const req = {query: {email}} as unknown as Request;

          expect(() => getUserEmailFromQueryService.handle(req)).toThrow(UserEmailInvalidException);
        }
      );
    });

    test('it handles', () => {
      const req = {query: {email: '  User@Example.com  '}} as unknown as Request;

      expect(getUserEmailFromQueryService.handle(req)).toStrictEqual('user@example.com');
    });
  });
});
