import ListSongsService from '@services/business-logic/ListSongsService';
import LogApiErrorService from '@services/LogApiErrorService';
import ListSongsRequestService from '@services/request-services/ListSongsRequestService';
import {NextFunction, Request, Response} from 'express';

class ListSongsController {
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = await new ListSongsRequestService().handle(req);
      const {status, payload} = await new ListSongsService().handle(dto);

      res.status(status).json(payload);
    } catch (e) {
      new LogApiErrorService().handle(e, req);

      return next(e);
    }
  }
}

export default ListSongsController;
