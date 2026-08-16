import AuthTokenInvalidException from '@exceptions/AuthTokenInvalidException';
import AuthTokenMissingException from '@exceptions/AuthTokenMissingException';
import AuthenticateUserMiddleware from '@middlewares/AuthenticateUserMiddleware';
import VerifyFirebaseIdTokenService from '@services/VerifyFirebaseIdTokenService';
import {NextFunction, Request, Response} from 'express';

import mockResolvedValue from '../utils/mockResolvedValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('AuthenticateUserMiddleware', () => {
  const next = jest.fn() as unknown as NextFunction;
  const res = {} as Response;

  const authenticateUserMiddleware = new AuthenticateUserMiddleware();

  describe('run', () => {
    describe('when no authorization header is present', () => {
      test('it calls next with AuthTokenMissingException', async () => {
        const req = {headers: {}} as Request;

        await authenticateUserMiddleware.run(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(AuthTokenMissingException));
      });
    });

    describe('when the authorization header is not a Bearer token', () => {
      test('it calls next with AuthTokenMissingException', async () => {
        const req = {headers: {authorization: 'Basic abc123'}} as Request;

        await authenticateUserMiddleware.run(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(AuthTokenMissingException));
      });
    });

    describe('when the token fails verification', () => {
      test('it calls next with AuthTokenInvalidException', async () => {
        const req = {headers: {authorization: 'Bearer idToken'}} as Request;
        VerifyFirebaseIdTokenService.prototype.handle = jest.fn().mockRejectedValue(new Error());

        await authenticateUserMiddleware.run(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(AuthTokenInvalidException));
      });
    });

    test('it sets req.firebaseUserId and calls next', async () => {
      const req = {headers: {authorization: 'Bearer idToken'}} as Request;
      VerifyFirebaseIdTokenService.prototype.handle = mockResolvedValue('uid');

      await authenticateUserMiddleware.run(req, res, next);

      expect(req.firebaseUserId).toStrictEqual('uid');
      expect(next).toHaveBeenCalledWith();
    });
  });
});
