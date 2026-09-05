import GetJamByIdRequestServiceDto from '@dtos/GetJamByIdRequestServiceDto';
import FirebaseRefIdType from '@t/parameter-validation/FirebaseRefIdType';
import JamIdType from '@t/parameter-validation/JamIdType';

class GetJamByIdDtoMapper {
  public map(jamId: JamIdType, firebaseRefId: FirebaseRefIdType): GetJamByIdRequestServiceDto {
    const dto = new GetJamByIdRequestServiceDto();

    dto.jamId = jamId;
    dto.firebaseRefId = firebaseRefId;

    return dto;
  }
}

export default GetJamByIdDtoMapper;
