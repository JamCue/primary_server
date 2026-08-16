import 'module-alias/register';

import ErrorMiddleware from '@middlewares/ErrorMiddleware';
import router from '@routes/index';
import RouterPredicateService from '@services/RouterPredicateService';
import compression from 'compression';
import * as dotenv from 'dotenv';
import express, {NextFunction, Request, Response} from 'express';
import * as core from 'express-serve-static-core';
import helmet from 'helmet';
import {ReasonPhrases, StatusCodes} from 'http-status-codes';

import {connectDatabase} from './config/database';
import {connectFirebase} from './config/firebase';

dotenv.config();

class App {
  constructor(private readonly app = express()) {
    this.initializeDatabase();
    this.initializeFirebase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandler();
  }

  get express(): core.Express {
    return this.app;
  }

  private initializeDatabase(): void {
    connectDatabase().catch((error: unknown) => {
      console.error('❌ Failed to initialize database connection:', error);
    });
  }

  private initializeFirebase(): void {
    connectFirebase();
  }

  private initializeMiddlewares(): void {
    const {app} = this;

    app.use(compression());
    app.use(helmet());

    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
  }

  private initializeRoutes(): void {
    const {app} = this;

    app.use((req: Request, res: Response, next: NextFunction) => {
      new RouterPredicateService().handle(req);
      return next();
    });

    app.use('/v1', router);

    app.use((req: Request, res: Response) => {
      return res.status(StatusCodes.NOT_FOUND).json({
        code: StatusCodes.NOT_FOUND,
        reason: ReasonPhrases.NOT_FOUND,
      });
    });
  }

  private initializeErrorHandler(): void {
    const {app} = this;

    app.use(new ErrorMiddleware().run);
  }
}

export default App;
