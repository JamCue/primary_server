import UpdateSongRequestServiceDto from '@dtos/UpdateSongRequestServiceDto';
import GetSongByIdServiceException from '@exceptions/inner/GetSongByIdServiceException';
import UpdateSongServiceException from '@exceptions/inner/UpdateSongServiceException';
import SongNotFoundException from '@exceptions/SongNotFoundException';
import HttpServiceInterface from '@i/HttpServiceInterface';
import SongRepository from '@repositories/SongRepository';
import ExtractChordsFromSheetContentService from '@services/business-logic/ExtractChordsFromSheetContentService';
import GetMusicianByFirebaseRefIdService from '@services/business-logic/GetMusicianByFirebaseRefIdService';
import SongIdType from '@t/parameter-validation/SongIdType';
import SongType from '@t/SongType';
import UpdateSongPayloadType from '@t/UpdateSongPayloadType';
import HttpResponseOk from '@value-objects/HttpResponseOk';

class UpdateSongService implements HttpServiceInterface {
  constructor(
    private readonly getMusicianByFirebaseRefIdService = new GetMusicianByFirebaseRefIdService(),
    private readonly extractChordsFromSheetContentService = new ExtractChordsFromSheetContentService(),
    private readonly songRepository = new SongRepository()
  ) {}

  /**
   * @throws inner/GetUserByFirebaseRefIdServiceException
   * @throws inner/GetSongByIdServiceException
   * @throws inner/UpdateSongServiceException
   * @throws UserNotFoundException
   * @throws SongNotFoundException
   */
  public async handle(dto: UpdateSongRequestServiceDto): Promise<HttpResponseOk> {
    const musician = await this.getMusicianByFirebaseRefIdService.handle(dto.firebaseRefId);
    const song = await this.getSong(dto.songId);

    if (!song || song.musicianId !== musician.id) {
      throw new SongNotFoundException();
    }

    // Chords are derived from sheetContent, so they're re-extracted on
    // every edit rather than accepted from the client — otherwise they'd
    // silently drift out of sync with a changed sheet.
    const chords = this.extractChordsFromSheetContentService.handle(dto.sheetContent);

    const updatedSong = await this.updateSong(dto.songId, {
      title: dto.title,
      artist: dto.artist,
      key: dto.key,
      capo: dto.capo,
      tempo: dto.tempo,
      timeSignature: dto.timeSignature,
      strummingPattern: dto.strummingPattern,
      sheetContent: dto.sheetContent,
      chords,
    });

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

  private async updateSong(songId: SongIdType, payload: UpdateSongPayloadType): Promise<SongType | null> {
    try {
      return await this.songRepository.update(songId, payload);
    } catch (e) {
      throw new UpdateSongServiceException(e);
    }
  }
}

export default UpdateSongService;
