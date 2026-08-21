import CreateSongRequestServiceDto from '@dtos/CreateSongRequestServiceDto';
import CreateSongRequestPayloadType from '@t/CreateSongRequestPayloadType';
import FirebaseRefIdType from '@t/parameter-validation/FirebaseRefIdType';

class CreateSongDtoMapper {
  public map(payload: CreateSongRequestPayloadType, firebaseRefId: FirebaseRefIdType): CreateSongRequestServiceDto {
    const dto = new CreateSongRequestServiceDto();

    dto.title = payload.title;
    dto.artist = payload.artist;
    dto.key = payload.key;
    dto.capo = payload.capo;
    dto.tempo = payload.tempo;
    dto.timeSignature = payload.timeSignature;
    dto.strummingPattern = payload.strummingPattern;
    dto.sheetContent = payload.sheetContent;
    dto.source = payload.source;
    dto.firebaseRefId = firebaseRefId;

    return dto;
  }
}

export default CreateSongDtoMapper;
