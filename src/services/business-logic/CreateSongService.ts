import CreateSongRequestServiceDto from '@dtos/CreateSongRequestServiceDto';
import HttpServiceInterface from '@i/HttpServiceInterface';
import ExtractChordsFromSheetContentService from '@services/business-logic/ExtractChordsFromSheetContentService';
import GetMusicianByFirebaseRefIdService from '@services/business-logic/GetMusicianByFirebaseRefIdService';
import SaveSongService from '@services/business-logic/SaveSongService';
import HttpResponseCreated from '@value-objects/HttpResponseCreated';

class CreateSongService implements HttpServiceInterface {
  constructor(
    private readonly getMusicianByFirebaseRefIdService = new GetMusicianByFirebaseRefIdService(),
    private readonly extractChordsFromSheetContentService = new ExtractChordsFromSheetContentService(),
    private readonly saveSongService = new SaveSongService()
  ) {}

  /**
   * @throws inner/GetUserByFirebaseRefIdServiceException
   * @throws inner/SaveSongServiceException
   * @throws UserNotFoundException
   */
  public async handle(dto: CreateSongRequestServiceDto): Promise<HttpResponseCreated> {
    const musician = await this.getMusicianByFirebaseRefIdService.handle(dto.firebaseRefId);
    const chords = this.extractChordsFromSheetContentService.handle(dto.sheetContent);

    const song = await this.saveSongService.handle({
      musicianId: musician.id,
      title: dto.title,
      artist: dto.artist,
      key: dto.key,
      capo: dto.capo,
      tempo: dto.tempo,
      timeSignature: dto.timeSignature,
      strummingPattern: dto.strummingPattern,
      sheetContent: dto.sheetContent,
      chords,
      source: dto.source,
      isFavorite: false,
    });

    return new HttpResponseCreated(song);
  }
}

export default CreateSongService;
