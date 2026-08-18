import ExtractFileTextService from '@services/business-logic/ExtractFileTextService';
import LogApiErrorService from '@services/LogApiErrorService';
import ExtractFileTextRequestService from '@services/request-services/ExtractFileTextRequestService';
import {NextFunction, Request, Response} from 'express';

class ExtractFileTextController {
  async post(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = await new ExtractFileTextRequestService().handle(req);
      const {status, payload} = await new ExtractFileTextService().handle(dto);

      res.status(status).json(payload);
    } catch (e) {
      new LogApiErrorService().handle(e, req);

      return next(e);
    }
  }
}

export default ExtractFileTextController;
