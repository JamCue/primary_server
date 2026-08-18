import RequestBodyInvalidException from '@exceptions/parameter-validation/RequestBodyInvalidException';
import GetRequestBodyService from '@services/parameter-validation/GetRequestBodyService';
import {Request} from 'express';

describe('GetRequestBodyService', () => {
  const getRequestBodyService = new GetRequestBodyService();

  describe('handle', () => {
    describe('when the body is missing or not a plain object', () => {
      test.each([undefined, null, 'string', 42, true, [], ['a']])(
        'it throws RequestBodyInvalidException for %p',
        body => {
          const req = {body} as Request;

          expect(() => getRequestBodyService.handle(req)).toThrow(RequestBodyInvalidException);
        }
      );
    });

    test('it handles', () => {
      const body = {name: 'name'};
      const req = {body} as Request;

      expect(getRequestBodyService.handle(req)).toStrictEqual(body);
    });
  });
});
