import FirebaseRefIdMissingException from '@exceptions/parameter-validation/FirebaseRefIdMissingException';
import GetFirebaseRefIdFromRequestService from '@services/parameter-validation/GetFirebaseRefIdFromRequestService';
import {Request} from 'express';

describe('GetFirebaseRefIdFromRequestService', () => {
  const getFirebaseRefIdFromRequestService = new GetFirebaseRefIdFromRequestService();

  describe('handle', () => {
    describe('when firebaseUserId is missing from the request', () => {
      test('it throws FirebaseRefIdMissingException', () => {
        const req = {} as Request;

        expect(() => getFirebaseRefIdFromRequestService.handle(req)).toThrow(FirebaseRefIdMissingException);
      });
    });

    test('it handles', () => {
      const req = {firebaseUserId: 'firebaseRefId'} as Request;

      expect(getFirebaseRefIdFromRequestService.handle(req)).toStrictEqual('firebaseRefId');
    });
  });
});
