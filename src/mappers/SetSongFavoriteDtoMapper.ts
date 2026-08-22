import SetSongFavoriteRequestServiceDto from '@dtos/SetSongFavoriteRequestServiceDto';
import FirebaseRefIdType from '@t/parameter-validation/FirebaseRefIdType';
import SongIdType from '@t/parameter-validation/SongIdType';
import SetSongFavoriteRequestPayloadType from '@t/SetSongFavoriteRequestPayloadType';

class SetSongFavoriteDtoMapper {
  public map(
    songId: SongIdType,
    payload: SetSongFavoriteRequestPayloadType,
    firebaseRefId: FirebaseRefIdType
  ): SetSongFavoriteRequestServiceDto {
    const dto = new SetSongFavoriteRequestServiceDto();

    dto.songId = songId;
    dto.isFavorite = payload.isFavorite;
    dto.firebaseRefId = firebaseRefId;

    return dto;
  }
}

export default SetSongFavoriteDtoMapper;
