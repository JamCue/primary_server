import FirebaseRefIdMissingException from '@exceptions/parameter-validation/FirebaseRefIdMissingException';
import FirebaseRefIdType from '@t/parameter-validation/FirebaseRefIdType';
import {Request} from 'express';

class GetFirebaseRefIdFromRequestService {
  /**
   * @throws parameter-validation/FirebaseRefIdMissingException
   */
  public handle(req: Request): FirebaseRefIdType {
    const firebaseRefId = req.firebaseUserId;

    if (!firebaseRefId) {
      throw new FirebaseRefIdMissingException();
    }

    return firebaseRefId;
  }
}

export default GetFirebaseRefIdFromRequestService;
