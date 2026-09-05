import GetJamByIdService from '@services/business-logic/GetJamByIdService';
import LogApiErrorService from '@services/LogApiErrorService';
import GetJamByIdRequestService from '@services/request-services/GetJamByIdRequestService';
import {NextFunction, Request, Response} from 'express';

class GetJamByIdController {
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = await new GetJamByIdRequestService().handle(req);
      const {status, payload} = await new GetJamByIdService().handle(dto);

      res.status(status).json(payload);
    } catch (e) {
      new LogApiErrorService().handle(e, req);

      return next(e);
    }
  }
}

export default GetJamByIdController;
