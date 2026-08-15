import ResponseExceptionCodeEnum from '@enums/ResponseExceptionCodeEnum';
import AbstractHttpResponseException from '@exceptions/AbstractHttpResponseException';
import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';

class ErrorMiddleware {
  public run(
    e: AbstractHttpResponseException | unknown,
    req: Request,
    res: Response,
    /* eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars */
    next: NextFunction
  ): void {
    if (e instanceof AbstractHttpResponseException) {
      const {status, message} = e;
      res.status(Number(status)).send(message);
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        code: ResponseExceptionCodeEnum.UNKNOWN,
        reason: (e as Error).name,
      });
    }
  }
}

export default ErrorMiddleware;
