import SetSongFavoriteRequestServiceDto from '@dtos/SetSongFavoriteRequestServiceDto';
import GetSongByIdServiceException from '@exceptions/inner/GetSongByIdServiceException';
import UpdateSongFavoriteServiceException from '@exceptions/inner/UpdateSongFavoriteServiceException';
import SongNotFoundException from '@exceptions/SongNotFoundException';
import HttpServiceInterface from '@i/HttpServiceInterface';
import SongRepository from '@repositories/SongRepository';
import GetMusicianByFirebaseRefIdService from '@services/business-logic/GetMusicianByFirebaseRefIdService';
import SongIdType from '@t/parameter-validation/SongIdType';
import SongType from '@t/SongType';
import HttpResponseOk from '@value-objects/HttpResponseOk';

class SetSongFavoriteService implements HttpServiceInterface {
  constructor(
    private readonly getMusicianByFirebaseRefIdService = new GetMusicianByFirebaseRefIdService(),
    private readonly songRepository = new SongRepository()
  ) {}

  /**
   * @throws inner/GetUserByFirebaseRefIdServiceException
   * @throws inner/GetSongByIdServiceException
   * @throws inner/UpdateSongFavoriteServiceException
   * @throws UserNotFoundException
   * @throws SongNotFoundException
   */
  public async handle(dto: SetSongFavoriteRequestServiceDto): Promise<HttpResponseOk> {
    const musician = await this.getMusicianByFirebaseRefIdService.handle(dto.firebaseRefId);
    const song = await this.getSong(dto.songId);

    if (!song || song.musicianId !== musician.id) {
      throw new SongNotFoundException();
    }

    const updatedSong = await this.updateFavorite(dto.songId, dto.isFavorite);

    if (!updatedSong) {
      throw new SongNotFoundException();
    }

    return new HttpResponseOk(updatedSong);
  }

  private async getSong(songId: SongIdType): Promise<SongType | null> {
    try {
      return await this.songRepository.getById(songId);
    } catch (e) {
      throw new GetSongByIdServiceException(e);
    }
  }

  private async updateFavorite(songId: SongIdType, isFavorite: boolean): Promise<SongType | null> {
    try {
      return await this.songRepository.updateFavorite(songId, isFavorite);
    } catch (e) {
      throw new UpdateSongFavoriteServiceException(e);
    }
  }
}

export default SetSongFavoriteService;
