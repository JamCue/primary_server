import UpdateSongRequestServiceDto from '@dtos/UpdateSongRequestServiceDto';
import FirebaseRefIdType from '@t/parameter-validation/FirebaseRefIdType';
import SongIdType from '@t/parameter-validation/SongIdType';
import UpdateSongRequestPayloadType from '@t/UpdateSongRequestPayloadType';

class UpdateSongDtoMapper {
  public map(
    songId: SongIdType,
    payload: UpdateSongRequestPayloadType,
    firebaseRefId: FirebaseRefIdType
  ): UpdateSongRequestServiceDto {
    const dto = new UpdateSongRequestServiceDto();

    dto.songId = songId;
    dto.title = payload.title;
    dto.artist = payload.artist;
    dto.key = payload.key;
    dto.capo = payload.capo;
    dto.tempo = payload.tempo;
    dto.timeSignature = payload.timeSignature;
    dto.strummingPattern = payload.strummingPattern;
    dto.sheetContent = payload.sheetContent;
    dto.firebaseRefId = firebaseRefId;

    return dto;
  }
}

export default UpdateSongDtoMapper;
