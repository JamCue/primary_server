import CreateSongRequestServiceDto from '@dtos/CreateSongRequestServiceDto';
import GetUserByFirebaseRefIdServiceException from '@exceptions/inner/GetUserByFirebaseRefIdServiceException';
import UserNotFoundException from '@exceptions/UserNotFoundException';
import HttpServiceInterface from '@i/HttpServiceInterface';
import UserRepository from '@repositories/UserRepository';
import ExtractChordsFromSheetContentService from '@services/business-logic/ExtractChordsFromSheetContentService';
import SaveSongService from '@services/business-logic/SaveSongService';
import FirebaseRefIdType from '@t/parameter-validation/FirebaseRefIdType';
import UserType from '@t/UserType';
import HttpResponseCreated from '@value-objects/HttpResponseCreated';

class CreateSongService implements HttpServiceInterface {
  constructor(
    private readonly userRepository = new UserRepository(),
    private readonly extractChordsFromSheetContentService = new ExtractChordsFromSheetContentService(),
    private readonly saveSongService = new SaveSongService()
  ) {}

  /**
   * @throws inner/GetUserByFirebaseRefIdServiceException
   * @throws inner/SaveSongServiceException
   * @throws UserNotFoundException
   */
  public async handle(dto: CreateSongRequestServiceDto): Promise<HttpResponseCreated> {
    const musician = await this.getMusician(dto.firebaseRefId);
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
    });

    return new HttpResponseCreated(song);
  }

  private async getMusician(firebaseRefId: FirebaseRefIdType): Promise<UserType> {
    const musician = await this.findMusician(firebaseRefId);

    if (!musician) {
      throw new UserNotFoundException();
    }

    return musician;
  }

  private async findMusician(firebaseRefId: FirebaseRefIdType): Promise<UserType | null> {
    try {
      return await this.userRepository.getByFirebaseRefId(firebaseRefId);
    } catch (e) {
      throw new GetUserByFirebaseRefIdServiceException(e);
    }
  }
}

export default CreateSongService;
