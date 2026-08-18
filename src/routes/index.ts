import CheckIfUserEmailExistsController from '@controllers/CheckIfUserEmailExistsController';
import CreateUserController from '@controllers/CreateUserController';
import GetLoggedInUserController from '@controllers/GetLoggedInUserController';
import GetMicroserviceVersionController from '@controllers/GetMicroserviceVersionController';
import AuthenticateUserMiddleware from '@middlewares/AuthenticateUserMiddleware';
import {Router} from 'express';

const router = Router();

router.get('/version', new GetMicroserviceVersionController().get);
router.post('/users', new AuthenticateUserMiddleware().run, new CreateUserController().post);
router.get('/users/me', new AuthenticateUserMiddleware().run, new GetLoggedInUserController().get);
router.get('/users/email-exists', new CheckIfUserEmailExistsController().get);

export default router;
