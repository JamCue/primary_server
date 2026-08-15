import GetMicroserviceVersionService from '@services/GetMicroserviceVersionService';
import LogApiErrorService from '@services/LogApiErrorService';
import {NextFunction, Request, Response} from 'express';

import {version} from '../../package.json';

class GetMicroserviceVersionController {
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {status, payload} = await new GetMicroserviceVersionService().handle(version);

      res.status(status).json({version: payload});
    } catch (e) {
      new LogApiErrorService().handle(e, req);

      return next(e);
    }
  }
}

export default GetMicroserviceVersionController;
