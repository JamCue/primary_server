import GetJamByIdRequestServiceDto from '@dtos/GetJamByIdRequestServiceDto';
import GetJamByIdServiceException from '@exceptions/inner/GetJamByIdServiceException';
import JamNotFoundException from '@exceptions/JamNotFoundException';
import HttpServiceInterface from '@i/HttpServiceInterface';
import JamRepository from '@repositories/JamRepository';
import GetMusicianByFirebaseRefIdService from '@services/business-logic/GetMusicianByFirebaseRefIdService';
import JamType from '@t/JamType';
import JamIdType from '@t/parameter-validation/JamIdType';
import HttpResponseOk from '@value-objects/HttpResponseOk';

class GetJamByIdService implements HttpServiceInterface {
  constructor(
    private readonly getMusicianByFirebaseRefIdService = new GetMusicianByFirebaseRefIdService(),
    private readonly jamRepository = new JamRepository()
  ) {}

  /**
   * @throws inner/GetUserByFirebaseRefIdServiceException
   * @throws inner/GetJamByIdServiceException
   * @throws UserNotFoundException
   * @throws JamNotFoundException
   */
  public async handle(dto: GetJamByIdRequestServiceDto): Promise<HttpResponseOk> {
    const musician = await this.getMusicianByFirebaseRefIdService.handle(dto.firebaseRefId);
    const jam = await this.getJam(dto.jamId);

    if (!jam || jam.musicianId !== musician.id) {
      throw new JamNotFoundException();
    }

    return new HttpResponseOk(jam);
  }

  private async getJam(jamId: JamIdType): Promise<JamType | null> {
    try {
      return await this.jamRepository.getById(jamId);
    } catch (e) {
      throw new GetJamByIdServiceException(e);
    }
  }
}

export default GetJamByIdService;
