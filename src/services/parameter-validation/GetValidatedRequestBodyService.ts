import RequestValidationException from '@exceptions/parameter-validation/RequestValidationException';
import {Request} from 'express';
import {z} from 'zod';

/**
 * Validates the whole `req.body` against a single Zod schema, instead of
 * extracting and validating one field at a time. Shared by every
 * POST/PUT/PATCH request service.
 */
class GetValidatedRequestBodyService {
  /**
   * @throws parameter-validation/RequestValidationException
   */
  public handle<T>(req: Request, schema: z.ZodType<T, z.ZodTypeDef, unknown>): T {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map(issue => ({
        path: issue.path.join('.'),
        message: issue.message,
      }));

      throw new RequestValidationException(errors);
    }

    return result.data;
  }
}

export default GetValidatedRequestBodyService;
