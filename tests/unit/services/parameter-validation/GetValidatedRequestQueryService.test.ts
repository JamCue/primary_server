import RequestValidationException from '@exceptions/parameter-validation/RequestValidationException';
import GetValidatedRequestQueryService from '@services/parameter-validation/GetValidatedRequestQueryService';
import {Request} from 'express';
import {z} from 'zod';

describe('GetValidatedRequestQueryService', () => {
  const schema = z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
  });

  const getValidatedRequestQueryService = new GetValidatedRequestQueryService();

  describe('handle', () => {
    describe('when the query fails schema validation', () => {
      test('it throws RequestValidationException', () => {
        const req = {query: {page: '0'}} as unknown as Request;

        expect(() => getValidatedRequestQueryService.handle(req, schema)).toThrow(RequestValidationException);
      });
    });

    test('it returns the parsed, typed data', () => {
      const req = {query: {page: '3'}} as unknown as Request;

      expect(getValidatedRequestQueryService.handle(req, schema)).toStrictEqual({page: 3});
    });

    test('it applies schema defaults when the query is empty', () => {
      const req = {query: {}} as unknown as Request;

      expect(getValidatedRequestQueryService.handle(req, schema)).toStrictEqual({page: 1});
    });
  });
});
