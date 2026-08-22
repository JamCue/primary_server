import RequestServiceDtoInterface from '@i/RequestServiceDtoInterface';
import FirebaseRefIdType from '@t/parameter-validation/FirebaseRefIdType';

class ListSongsRequestServiceDto implements RequestServiceDtoInterface {
  public firebaseRefId!: FirebaseRefIdType;
  public search?: string;
  public key?: string;
  public favorite?: boolean;
  public sort!: 'recent' | 'title';
  public page!: number;
  public limit!: number;
}

export default ListSongsRequestServiceDto;
