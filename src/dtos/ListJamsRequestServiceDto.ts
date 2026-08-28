import RequestServiceDtoInterface from '@i/RequestServiceDtoInterface';
import FirebaseRefIdType from '@t/parameter-validation/FirebaseRefIdType';

class ListJamsRequestServiceDto implements RequestServiceDtoInterface {
  public when?: 'upcoming' | 'past';
  public page!: number;
  public limit!: number;
  public firebaseRefId!: FirebaseRefIdType;
}

export default ListJamsRequestServiceDto;
