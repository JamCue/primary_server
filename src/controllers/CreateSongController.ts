import CreateSongService from '@services/business-logic/CreateSongService';
import LogApiErrorService from '@services/LogApiErrorService';
import CreateSongRequestService from '@services/request-services/CreateSongRequestService';
import {NextFunction, Request, Response} from 'express';

class CreateSongController {
  async post(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = await new CreateSongRequestService().handle(req);
      const {status, payload} = await new CreateSongService().handle(dto);

      res.status(status).json(payload);
    } catch (e) {
      new LogApiErrorService().handle(e, req);

      return next(e);
    }
  }
}

export default CreateSongController;
