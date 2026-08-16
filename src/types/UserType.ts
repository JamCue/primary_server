import FirebaseRefIdType from '@t/parameter-validation/FirebaseRefIdType';
import UserEmailType from '@t/parameter-validation/UserEmailType';
import UserNameType from '@t/parameter-validation/UserNameType';

type UserType = {
  id: string;
  name: UserNameType;
  email: UserEmailType;
  firebaseRefId: FirebaseRefIdType;
  createdAt: Date;
};

export default UserType;
