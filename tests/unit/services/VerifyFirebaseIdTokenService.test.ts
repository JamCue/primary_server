import VerifyFirebaseIdTokenServiceException from '@exceptions/inner/VerifyFirebaseIdTokenServiceException';
import VerifyFirebaseIdTokenService from '@services/VerifyFirebaseIdTokenService';
import {getAuth} from 'firebase-admin/auth';

import mockImplementation from '../utils/mockImplementation';
import mockResolvedValue from '../utils/mockResolvedValue';

jest.mock('firebase-admin/auth');

afterEach(() => {
  jest.restoreAllMocks();
});

describe('VerifyFirebaseIdTokenService', () => {
  const idToken = 'idToken';

  const verifyFirebaseIdTokenService = new VerifyFirebaseIdTokenService();

  describe('handle', () => {
    describe('when the token is invalid', () => {
      test('it throws VerifyFirebaseIdTokenServiceException', async () => {
        const verifyIdToken = mockImplementation(() => {
          throw new Error();
        });
        (getAuth as jest.Mock).mockReturnValue({verifyIdToken});

        await expect(verifyFirebaseIdTokenService.handle(idToken)).rejects.toBeInstanceOf(
          VerifyFirebaseIdTokenServiceException
        );
      });
    });

    test('it handles', async () => {
      const verifyIdToken = mockResolvedValue({uid: 'uid'});
      (getAuth as jest.Mock).mockReturnValue({verifyIdToken});

      await expect(verifyFirebaseIdTokenService.handle(idToken)).resolves.toStrictEqual('uid');
      expect(verifyIdToken).toHaveBeenCalledWith(idToken);
    });
  });
});
