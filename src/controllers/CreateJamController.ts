import CreateJamService from '@services/business-logic/CreateJamService';
import LogApiErrorService from '@services/LogApiErrorService';
import CreateJamRequestService from '@services/request-services/CreateJamRequestService';
import {NextFunction, Request, Response} from 'express';

class CreateJamController {
  async post(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = await new CreateJamRequestService().handle(req);
      const {status, payload} = await new CreateJamService().handle(dto);

      res.status(status).json(payload);
    } catch (e) {
      new LogApiErrorService().handle(e, req);

      return next(e);
    }
  }
}

export default CreateJamController;
