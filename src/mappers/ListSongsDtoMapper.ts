import ListSongsRequestServiceDto from '@dtos/ListSongsRequestServiceDto';
import ListSongsQueryType from '@t/ListSongsQueryType';
import FirebaseRefIdType from '@t/parameter-validation/FirebaseRefIdType';

class ListSongsDtoMapper {
  public map(query: ListSongsQueryType, firebaseRefId: FirebaseRefIdType): ListSongsRequestServiceDto {
    const dto = new ListSongsRequestServiceDto();

    dto.search = query.search;
    dto.key = query.key;
    dto.favorite = query.favorite;
    dto.sort = query.sort;
    dto.page = query.page;
    dto.limit = query.limit;
    dto.firebaseRefId = firebaseRefId;

    return dto;
  }
}

export default ListSongsDtoMapper;
