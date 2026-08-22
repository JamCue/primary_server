import JamAudienceAccessEnum from '@enums/JamAudienceAccessEnum';
import JamSessionTypeEnum from '@enums/JamSessionTypeEnum';
import RequestServiceDtoInterface from '@i/RequestServiceDtoInterface';
import JamSetlistSongType from '@t/JamSetlistSongType';
import FirebaseRefIdType from '@t/parameter-validation/FirebaseRefIdType';

class CreateJamRequestServiceDto implements RequestServiceDtoInterface {
  public title!: string;
  public description?: string;
  public songs!: JamSetlistSongType[];
  public scheduledAt!: Date;
  public location?: string;
  public sessionType!: JamSessionTypeEnum;
  public audienceAccess!: JamAudienceAccessEnum;
  public strummingDisplay!: boolean;
  public showChords!: boolean;
  public capoDisplay!: boolean;
  public requestLimit!: number;
  public autoAdvance!: boolean;
  public firebaseRefId!: FirebaseRefIdType;
}

export default CreateJamRequestServiceDto;
