import GetSongByIdService from '@services/business-logic/GetSongByIdService';
import LogApiErrorService from '@services/LogApiErrorService';
import GetSongByIdRequestService from '@services/request-services/GetSongByIdRequestService';
import {NextFunction, Request, Response} from 'express';

class GetSongByIdController {
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = await new GetSongByIdRequestService().handle(req);
      const {status, payload} = await new GetSongByIdService().handle(dto);

      res.status(status).json(payload);
    } catch (e) {
      new LogApiErrorService().handle(e, req);

      return next(e);
    }
  }
}

export default GetSongByIdController;
