import ListJamsService from '@services/business-logic/ListJamsService';
import LogApiErrorService from '@services/LogApiErrorService';
import ListJamsRequestService from '@services/request-services/ListJamsRequestService';
import {NextFunction, Request, Response} from 'express';

class ListJamsController {
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = await new ListJamsRequestService().handle(req);
      const {status, payload} = await new ListJamsService().handle(dto);

      res.status(status).json(payload);
    } catch (e) {
      new LogApiErrorService().handle(e, req);

      return next(e);
    }
  }
}

export default ListJamsController;
