import CheckIfUserEmailExistsController from '@controllers/CheckIfUserEmailExistsController';
import CreateJamController from '@controllers/CreateJamController';
import CreateSongController from '@controllers/CreateSongController';
import CreateUserController from '@controllers/CreateUserController';
import ExtractFileTextController from '@controllers/ExtractFileTextController';
import GetLoggedInUserController from '@controllers/GetLoggedInUserController';
import GetMicroserviceVersionController from '@controllers/GetMicroserviceVersionController';
import GetSongByIdController from '@controllers/GetSongByIdController';
import ListJamsController from '@controllers/ListJamsController';
import ListSongsController from '@controllers/ListSongsController';
import SetSongFavoriteController from '@controllers/SetSongFavoriteController';
import UpdateSongController from '@controllers/UpdateSongController';
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
router.get('/songs', new AuthenticateUserMiddleware().run, new ListSongsController().get);
router.get('/songs/:songId', new AuthenticateUserMiddleware().run, new GetSongByIdController().get);
router.patch('/songs/:songId', new AuthenticateUserMiddleware().run, new UpdateSongController().patch);
router.patch('/songs/:songId/favorite', new AuthenticateUserMiddleware().run, new SetSongFavoriteController().patch);
router.post('/jams', new AuthenticateUserMiddleware().run, new CreateJamController().post);
router.get('/jams', new AuthenticateUserMiddleware().run, new ListJamsController().get);

export default router;
