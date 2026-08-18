import GetLoggedInUserRequestServiceDto from '@dtos/GetLoggedInUserRequestServiceDto';
import FirebaseRefIdType from '@t/parameter-validation/FirebaseRefIdType';

class GetLoggedInUserDtoMapper {
  public map({firebaseRefId}: {firebaseRefId: FirebaseRefIdType}): GetLoggedInUserRequestServiceDto {
    const dto = new GetLoggedInUserRequestServiceDto();

    dto.firebaseRefId = firebaseRefId;

    return dto;
  }
}

export default GetLoggedInUserDtoMapper;
