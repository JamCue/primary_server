import CheckIfUserEmailExistsService from '@services/business-logic/CheckIfUserEmailExistsService';
import LogApiErrorService from '@services/LogApiErrorService';
import CheckIfUserEmailExistsRequestService from '@services/request-services/CheckIfUserEmailExistsRequestService';
import {NextFunction, Request, Response} from 'express';

class CheckIfUserEmailExistsController {
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = await new CheckIfUserEmailExistsRequestService().handle(req);
      const {status, payload} = await new CheckIfUserEmailExistsService().handle(dto);

      res.status(status).json(payload);
    } catch (e) {
      new LogApiErrorService().handle(e, req);

      return next(e);
    }
  }
}

export default CheckIfUserEmailExistsController;
