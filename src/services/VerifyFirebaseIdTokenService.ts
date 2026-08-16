import VerifyFirebaseIdTokenServiceException from '@exceptions/inner/VerifyFirebaseIdTokenServiceException';
import {getAuth} from 'firebase-admin/auth';

class VerifyFirebaseIdTokenService {
  /**
   * @throws inner/VerifyFirebaseIdTokenServiceException
   */
  public async handle(idToken: string): Promise<string> {
    try {
      const decodedToken = await getAuth().verifyIdToken(idToken);

      return decodedToken.uid;
    } catch (e) {
      throw new VerifyFirebaseIdTokenServiceException(e);
    }
  }
}

export default VerifyFirebaseIdTokenService;
