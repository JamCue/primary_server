import RequestServiceDtoInterface from '@i/RequestServiceDtoInterface';
import FirebaseRefIdType from '@t/parameter-validation/FirebaseRefIdType';

class GetLoggedInUserRequestServiceDto implements RequestServiceDtoInterface {
  public firebaseRefId!: FirebaseRefIdType;
}

export default GetLoggedInUserRequestServiceDto;
