import GetLoggedInUserService from '@services/business-logic/GetLoggedInUserService';
import LogApiErrorService from '@services/LogApiErrorService';
import GetLoggedInUserRequestService from '@services/request-services/GetLoggedInUserRequestService';
import {NextFunction, Request, Response} from 'express';

class GetLoggedInUserController {
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = await new GetLoggedInUserRequestService().handle(req);
      const {status, payload} = await new GetLoggedInUserService().handle(dto);

      res.status(status).json(payload);
    } catch (e) {
      new LogApiErrorService().handle(e, req);

      return next(e);
    }
  }
}

export default GetLoggedInUserController;
