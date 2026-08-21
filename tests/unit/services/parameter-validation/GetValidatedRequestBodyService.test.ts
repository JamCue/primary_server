import RequestValidationException from '@exceptions/parameter-validation/RequestValidationException';
import GetValidatedRequestBodyService from '@services/parameter-validation/GetValidatedRequestBodyService';
import {Request} from 'express';
import {z} from 'zod';

describe('GetValidatedRequestBodyService', () => {
  const schema = z.object({
    name: z.string().min(2),
    age: z.number().int().min(0),
  });

  const getValidatedRequestBodyService = new GetValidatedRequestBodyService();

  describe('handle', () => {
    describe('when the body fails schema validation', () => {
      test('it throws RequestValidationException with one error per failing field', () => {
        const req = {body: {name: 'a', age: -1}} as Request;

        try {
          getValidatedRequestBodyService.handle(req, schema);
          throw new Error('expected handle to throw');
        } catch (e) {
          expect(e).toBeInstanceOf(RequestValidationException);
          const exception = e as RequestValidationException;

          expect(exception.message.errors).toHaveLength(2);
          expect(exception.message.errors?.map(error => error.path)).toStrictEqual(['name', 'age']);
        }
      });
    });

    describe('when the body is not an object at all', () => {
      test('it throws RequestValidationException', () => {
        const req = {body: 'not-an-object'} as unknown as Request;

        expect(() => getValidatedRequestBodyService.handle(req, schema)).toThrow(RequestValidationException);
      });
    });

    test('it returns the parsed, typed data', () => {
      const req = {body: {name: 'Jane', age: 30}} as Request;

      expect(getValidatedRequestBodyService.handle(req, schema)).toStrictEqual({name: 'Jane', age: 30});
    });
  });
});
