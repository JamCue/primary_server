import RouterPredicateService from '@services/RouterPredicateService';
import {Request} from 'express';

import mockReturnValue from '../utils/mockReturnValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('RouterPredicateService', () => {
  const originalUrl = 'originalUrl';
  const method = 'method';
  const socket = {remoteAddress: 'remoteAddress'};
  const req = {originalUrl, method, socket} as Request;

  const routerPredicateService = new RouterPredicateService();

  describe('handle', () => {
    test('it handles', () => {
      console.log = mockReturnValue();

      expect(routerPredicateService.handle(req)).toBeUndefined();

      expect(jest.spyOn(console, 'log')).toBeCalledWith(
        `API CALLED ==> route: ${req.originalUrl} method: ${req.method} ip: ${req.socket.remoteAddress}`
      );
    });
  });
});
