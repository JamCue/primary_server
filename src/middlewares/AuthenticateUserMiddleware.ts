import AuthTokenInvalidException from '@exceptions/AuthTokenInvalidException';
import AuthTokenMissingException from '@exceptions/AuthTokenMissingException';
import VerifyFirebaseIdTokenService from '@services/VerifyFirebaseIdTokenService';
import {NextFunction, Request, Response} from 'express';

class AuthenticateUserMiddleware {
  public async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idToken = AuthenticateUserMiddleware.extractToken(req);

      if (!idToken) {
        throw new AuthTokenMissingException();
      }

      try {
        req.firebaseUserId = await new VerifyFirebaseIdTokenService().handle(idToken);
      } catch {
        throw new AuthTokenInvalidException();
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  private static extractToken(req: Request): string | undefined {
    const [scheme, token] = (req.headers.authorization ?? '').split(' ');

    return scheme === 'Bearer' ? token : undefined;
  }
}

export default AuthenticateUserMiddleware;
