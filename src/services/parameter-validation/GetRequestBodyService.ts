import RequestBodyInvalidException from '@exceptions/parameter-validation/RequestBodyInvalidException';
import {Request} from 'express';
import {isPlainObject} from 'lodash';

class GetRequestBodyService {
  /**
   * @throws parameter-validation/RequestBodyInvalidException
   */
  public handle(req: Request): Record<string, unknown> {
    const body: unknown = req.body;

    if (body === undefined || body === null || !isPlainObject(body)) {
      throw new RequestBodyInvalidException();
    }

    return body as Record<string, unknown>;
  }
}

export default GetRequestBodyService;
