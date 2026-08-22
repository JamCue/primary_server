import CreateJamRequestServiceDto from '@dtos/CreateJamRequestServiceDto';
import JamJoinOptionEnum from '@enums/JamJoinOptionEnum';
import HttpServiceInterface from '@i/HttpServiceInterface';
import GenerateJamJoinCodeService from '@services/business-logic/GenerateJamJoinCodeService';
import GetMusicianByFirebaseRefIdService from '@services/business-logic/GetMusicianByFirebaseRefIdService';
import SaveJamService from '@services/business-logic/SaveJamService';
import HttpResponseCreated from '@value-objects/HttpResponseCreated';

class CreateJamService implements HttpServiceInterface {
  constructor(
    private readonly getMusicianByFirebaseRefIdService = new GetMusicianByFirebaseRefIdService(),
    private readonly generateJamJoinCodeService = new GenerateJamJoinCodeService(),
    private readonly saveJamService = new SaveJamService()
  ) {}

  /**
   * @throws inner/GetUserByFirebaseRefIdServiceException
   * @throws inner/SaveJamServiceException
   * @throws UserNotFoundException
   */
  public async handle(dto: CreateJamRequestServiceDto): Promise<HttpResponseCreated> {
    const musician = await this.getMusicianByFirebaseRefIdService.handle(dto.firebaseRefId);
    const joinCode = this.generateJamJoinCodeService.handle();

    const jam = await this.saveJamService.handle({
      musicianId: musician.id,
      title: dto.title,
      description: dto.description,
      songs: dto.songs,
      scheduledAt: dto.scheduledAt,
      location: dto.location,
      sessionType: dto.sessionType,
      audienceAccess: dto.audienceAccess,
      // Not a client-supplied field yet — see JamJoinOptionEnum.
      joinOption: JamJoinOptionEnum.QR_AND_LINK,
      strummingDisplay: dto.strummingDisplay,
      showChords: dto.showChords,
      capoDisplay: dto.capoDisplay,
      requestLimit: dto.requestLimit,
      autoAdvance: dto.autoAdvance,
      joinCode,
    });

    return new HttpResponseCreated(jam);
  }
}

export default CreateJamService;
