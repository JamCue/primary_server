import GetSongByIdRequestServiceDto from '@dtos/GetSongByIdRequestServiceDto';
import FirebaseRefIdType from '@t/parameter-validation/FirebaseRefIdType';
import SongIdType from '@t/parameter-validation/SongIdType';

class GetSongByIdDtoMapper {
  public map(songId: SongIdType, firebaseRefId: FirebaseRefIdType): GetSongByIdRequestServiceDto {
    const dto = new GetSongByIdRequestServiceDto();

    dto.songId = songId;
    dto.firebaseRefId = firebaseRefId;

    return dto;
  }
}

export default GetSongByIdDtoMapper;
