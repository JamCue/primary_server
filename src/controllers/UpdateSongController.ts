import UpdateSongService from '@services/business-logic/UpdateSongService';
import LogApiErrorService from '@services/LogApiErrorService';
import UpdateSongRequestService from '@services/request-services/UpdateSongRequestService';
import {NextFunction, Request, Response} from 'express';

class UpdateSongController {
  async patch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = await new UpdateSongRequestService().handle(req);
      const {status, payload} = await new UpdateSongService().handle(dto);

      res.status(status).json(payload);
    } catch (e) {
      new LogApiErrorService().handle(e, req);

      return next(e);
    }
  }
}

export default UpdateSongController;
