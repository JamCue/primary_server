import GetSongByIdRequestServiceDto from '@dtos/GetSongByIdRequestServiceDto';
import GetSongByIdServiceException from '@exceptions/inner/GetSongByIdServiceException';
import SongNotFoundException from '@exceptions/SongNotFoundException';
import HttpServiceInterface from '@i/HttpServiceInterface';
import SongRepository from '@repositories/SongRepository';
import GetMusicianByFirebaseRefIdService from '@services/business-logic/GetMusicianByFirebaseRefIdService';
import SongIdType from '@t/parameter-validation/SongIdType';
import SongType from '@t/SongType';
import HttpResponseOk from '@value-objects/HttpResponseOk';

class GetSongByIdService implements HttpServiceInterface {
  constructor(
    private readonly getMusicianByFirebaseRefIdService = new GetMusicianByFirebaseRefIdService(),
    private readonly songRepository = new SongRepository()
  ) {}

  /**
   * @throws inner/GetUserByFirebaseRefIdServiceException
   * @throws inner/GetSongByIdServiceException
   * @throws UserNotFoundException
   * @throws SongNotFoundException
   */
  public async handle(dto: GetSongByIdRequestServiceDto): Promise<HttpResponseOk> {
    const musician = await this.getMusicianByFirebaseRefIdService.handle(dto.firebaseRefId);
    const song = await this.getSong(dto.songId);

    if (!song || song.musicianId !== musician.id) {
      throw new SongNotFoundException();
    }

    return new HttpResponseOk(song);
  }

  private async getSong(songId: SongIdType): Promise<SongType | null> {
    try {
      return await this.songRepository.getById(songId);
    } catch (e) {
      throw new GetSongByIdServiceException(e);
    }
  }
}

export default GetSongByIdService;
