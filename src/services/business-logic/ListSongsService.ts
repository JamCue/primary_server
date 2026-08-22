import ListSongsRequestServiceDto from '@dtos/ListSongsRequestServiceDto';
import ListSongsServiceException from '@exceptions/inner/ListSongsServiceException';
import HttpServiceInterface from '@i/HttpServiceInterface';
import SongRepository from '@repositories/SongRepository';
import GetMusicianByFirebaseRefIdService from '@services/business-logic/GetMusicianByFirebaseRefIdService';
import ListSongsFilterType from '@t/ListSongsFilterType';
import SongType from '@t/SongType';
import HttpResponseOk from '@value-objects/HttpResponseOk';

class ListSongsService implements HttpServiceInterface {
  constructor(
    private readonly getMusicianByFirebaseRefIdService = new GetMusicianByFirebaseRefIdService(),
    private readonly songRepository = new SongRepository()
  ) {}

  /**
   * @throws inner/GetUserByFirebaseRefIdServiceException
   * @throws inner/ListSongsServiceException
   * @throws UserNotFoundException
   */
  public async handle(dto: ListSongsRequestServiceDto): Promise<HttpResponseOk> {
    const musician = await this.getMusicianByFirebaseRefIdService.handle(dto.firebaseRefId);

    const {songs, total} = await this.listSongs({
      musicianId: musician.id,
      search: dto.search,
      key: dto.key,
      favorite: dto.favorite,
      sort: dto.sort,
      page: dto.page,
      limit: dto.limit,
    });

    return new HttpResponseOk({songs, total, page: dto.page, limit: dto.limit});
  }

  private async listSongs(filter: ListSongsFilterType): Promise<{songs: SongType[]; total: number}> {
    try {
      return await this.songRepository.list(filter);
    } catch (e) {
      throw new ListSongsServiceException(e);
    }
  }
}

export default ListSongsService;
