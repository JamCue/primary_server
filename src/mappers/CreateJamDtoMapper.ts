import CreateJamRequestServiceDto from '@dtos/CreateJamRequestServiceDto';
import CreateJamRequestPayloadType from '@t/CreateJamRequestPayloadType';
import FirebaseRefIdType from '@t/parameter-validation/FirebaseRefIdType';

class CreateJamDtoMapper {
  public map(payload: CreateJamRequestPayloadType, firebaseRefId: FirebaseRefIdType): CreateJamRequestServiceDto {
    const dto = new CreateJamRequestServiceDto();

    dto.title = payload.title;
    dto.description = payload.description;
    dto.songs = payload.songs;
    dto.scheduledAt = payload.scheduledAt;
    dto.location = payload.location;
    dto.sessionType = payload.sessionType;
    dto.audienceAccess = payload.audienceAccess;
    dto.strummingDisplay = payload.strummingDisplay;
    dto.showChords = payload.showChords;
    dto.capoDisplay = payload.capoDisplay;
    dto.requestLimit = payload.requestLimit;
    dto.autoAdvance = payload.autoAdvance;
    dto.firebaseRefId = firebaseRefId;

    return dto;
  }
}

export default CreateJamDtoMapper;
