import GetMicroserviceVersionController from '@controllers/GetMicroserviceVersionController';
import {Router} from 'express';

const router = Router();

router.get('/version', new GetMicroserviceVersionController().get);

export default router;
