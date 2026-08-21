import CheckIfUserEmailExistsController from '@controllers/CheckIfUserEmailExistsController';
import CreateSongController from '@controllers/CreateSongController';
import CreateUserController from '@controllers/CreateUserController';
import ExtractFileTextController from '@controllers/ExtractFileTextController';
import GetLoggedInUserController from '@controllers/GetLoggedInUserController';
import GetMicroserviceVersionController from '@controllers/GetMicroserviceVersionController';
import AuthenticateUserMiddleware from '@middlewares/AuthenticateUserMiddleware';
import UploadFileMiddleware from '@middlewares/UploadFileMiddleware';
import {Router} from 'express';

const router = Router();

router.get('/version', new GetMicroserviceVersionController().get);
router.post('/users', new AuthenticateUserMiddleware().run, new CreateUserController().post);
router.get('/users/me', new AuthenticateUserMiddleware().run, new GetLoggedInUserController().get);
router.get('/users/email-exists', new CheckIfUserEmailExistsController().get);
router.post(
  '/files/extract-text',
  new AuthenticateUserMiddleware().run,
  new UploadFileMiddleware().run,
  new ExtractFileTextController().post
);
router.post('/songs', new AuthenticateUserMiddleware().run, new CreateSongController().post);

export default router;
