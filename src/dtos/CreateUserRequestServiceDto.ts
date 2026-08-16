import RequestServiceDtoInterface from '@i/RequestServiceDtoInterface';
import FirebaseRefIdType from '@t/parameter-validation/FirebaseRefIdType';
import UserEmailType from '@t/parameter-validation/UserEmailType';
import UserNameType from '@t/parameter-validation/UserNameType';

class CreateUserRequestServiceDto implements RequestServiceDtoInterface {
  public name!: UserNameType;
  public email!: UserEmailType;
  public firebaseRefId!: FirebaseRefIdType;
}

export default CreateUserRequestServiceDto;
