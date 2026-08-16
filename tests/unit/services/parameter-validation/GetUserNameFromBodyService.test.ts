import UserNameInvalidException from '@exceptions/parameter-validation/UserNameInvalidException';
import GetUserNameFromBodyService from '@services/parameter-validation/GetUserNameFromBodyService';
import {Request} from 'express';

describe('GetUserNameFromBodyService', () => {
  const getUserNameFromBodyService = new GetUserNameFromBodyService();

  describe('handle', () => {
    describe('when name is invalid', () => {
      test.each([undefined, '', 'a', 'a'.repeat(101)])('it throws UserNameInvalidException for %p', name => {
        const req = {body: {name}} as Request;

        expect(() => getUserNameFromBodyService.handle(req)).toThrow(UserNameInvalidException);
      });
    });

    test('it handles', () => {
      const req = {body: {name: '  Jane Doe  '}} as Request;

      expect(getUserNameFromBodyService.handle(req)).toStrictEqual('Jane Doe');
    });
  });
});
