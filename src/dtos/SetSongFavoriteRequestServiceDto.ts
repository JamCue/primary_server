import RequestServiceDtoInterface from '@i/RequestServiceDtoInterface';
import FirebaseRefIdType from '@t/parameter-validation/FirebaseRefIdType';
import SongIdType from '@t/parameter-validation/SongIdType';

class SetSongFavoriteRequestServiceDto implements RequestServiceDtoInterface {
  public songId!: SongIdType;
  public isFavorite!: boolean;
  public firebaseRefId!: FirebaseRefIdType;
}

export default SetSongFavoriteRequestServiceDto;
