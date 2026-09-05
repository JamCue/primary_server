import RequestServiceDtoInterface from '@i/RequestServiceDtoInterface';
import FirebaseRefIdType from '@t/parameter-validation/FirebaseRefIdType';
import JamIdType from '@t/parameter-validation/JamIdType';

class GetJamByIdRequestServiceDto implements RequestServiceDtoInterface {
  public jamId!: JamIdType;
  public firebaseRefId!: FirebaseRefIdType;
}

export default GetJamByIdRequestServiceDto;
