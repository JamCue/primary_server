import SetSongFavoriteService from '@services/business-logic/SetSongFavoriteService';
import LogApiErrorService from '@services/LogApiErrorService';
import SetSongFavoriteRequestService from '@services/request-services/SetSongFavoriteRequestService';
import {NextFunction, Request, Response} from 'express';

class SetSongFavoriteController {
  async patch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = await new SetSongFavoriteRequestService().handle(req);
      const {status, payload} = await new SetSongFavoriteService().handle(dto);

      res.status(status).json(payload);
    } catch (e) {
      new LogApiErrorService().handle(e, req);

      return next(e);
    }
  }
}

export default SetSongFavoriteController;
