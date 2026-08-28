import ListJamsRequestServiceDto from '@dtos/ListJamsRequestServiceDto';
import ListJamsQueryType from '@t/ListJamsQueryType';
import FirebaseRefIdType from '@t/parameter-validation/FirebaseRefIdType';

class ListJamsDtoMapper {
  public map(query: ListJamsQueryType, firebaseRefId: FirebaseRefIdType): ListJamsRequestServiceDto {
    const dto = new ListJamsRequestServiceDto();

    dto.when = query.when;
    dto.page = query.page;
    dto.limit = query.limit;
    dto.firebaseRefId = firebaseRefId;

    return dto;
  }
}

export default ListJamsDtoMapper;
