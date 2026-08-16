import CreateUserService from '@services/business-logic/CreateUserService';
import LogApiErrorService from '@services/LogApiErrorService';
import CreateUserRequestService from '@services/request-services/CreateUserRequestService';
import {NextFunction, Request, Response} from 'express';

class CreateUserController {
  async post(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = await new CreateUserRequestService().handle(req);
      const {status, payload} = await new CreateUserService().handle(dto);

      res.status(status).json(payload);
    } catch (e) {
      new LogApiErrorService().handle(e, req);

      return next(e);
    }
  }
}

export default CreateUserController;
