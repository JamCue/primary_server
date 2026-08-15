import {Request} from 'express';

class RouterPredicateService {
  public handle(req: Request): void {
    console.log(`API CALLED ==> route: ${req.originalUrl} method: ${req.method} ip: ${req.socket.remoteAddress}`);
  }
}

export default RouterPredicateService;
