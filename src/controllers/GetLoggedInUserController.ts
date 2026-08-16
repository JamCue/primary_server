import GetLoggedInUserService from '@services/business-logic/GetLoggedInUserService';
import LogApiErrorService from '@services/LogApiErrorService';
import GetFirebaseRefIdFromRequestService from '@services/parameter-validation/GetFirebaseRefIdFromRequestService';
import {NextFunction, Request, Response} from 'express';

class GetLoggedInUserController {
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const firebaseRefId = new GetFirebaseRefIdFromRequestService().handle(req);
      const {status, payload} = await new GetLoggedInUserService().handle(firebaseRefId);

      res.status(status).json(payload);
    } catch (e) {
      new LogApiErrorService().handle(e, req);

      return next(e);
    }
  }
}

export default GetLoggedInUserController;
