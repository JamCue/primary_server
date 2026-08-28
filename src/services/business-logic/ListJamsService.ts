import ListJamsRequestServiceDto from '@dtos/ListJamsRequestServiceDto';
import ListJamsServiceException from '@exceptions/inner/ListJamsServiceException';
import HttpServiceInterface from '@i/HttpServiceInterface';
import JamRepository from '@repositories/JamRepository';
import GetMusicianByFirebaseRefIdService from '@services/business-logic/GetMusicianByFirebaseRefIdService';
import JamType from '@t/JamType';
import ListJamsFilterType from '@t/ListJamsFilterType';
import HttpResponseOk from '@value-objects/HttpResponseOk';

class ListJamsService implements HttpServiceInterface {
  constructor(
    private readonly getMusicianByFirebaseRefIdService = new GetMusicianByFirebaseRefIdService(),
    private readonly jamRepository = new JamRepository()
  ) {}

  /**
   * @throws inner/GetUserByFirebaseRefIdServiceException
   * @throws inner/ListJamsServiceException
   * @throws UserNotFoundException
   */
  public async handle(dto: ListJamsRequestServiceDto): Promise<HttpResponseOk> {
    const musician = await this.getMusicianByFirebaseRefIdService.handle(dto.firebaseRefId);

    const {jams, total} = await this.listJams({
      musicianId: musician.id,
      when: dto.when,
      page: dto.page,
      limit: dto.limit,
    });

    return new HttpResponseOk({jams, total, page: dto.page, limit: dto.limit});
  }

  private async listJams(filter: ListJamsFilterType): Promise<{jams: JamType[]; total: number}> {
    try {
      return await this.jamRepository.list(filter);
    } catch (e) {
      throw new ListJamsServiceException(e);
    }
  }
}

export default ListJamsService;
