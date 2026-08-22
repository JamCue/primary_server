import RequestServiceDtoInterface from '@i/RequestServiceDtoInterface';
import FirebaseRefIdType from '@t/parameter-validation/FirebaseRefIdType';
import SongIdType from '@t/parameter-validation/SongIdType';

class GetSongByIdRequestServiceDto implements RequestServiceDtoInterface {
  public songId!: SongIdType;
  public firebaseRefId!: FirebaseRefIdType;
}

export default GetSongByIdRequestServiceDto;
