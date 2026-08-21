import SongSourceEnum from '@enums/SongSourceEnum';
import RequestServiceDtoInterface from '@i/RequestServiceDtoInterface';
import FirebaseRefIdType from '@t/parameter-validation/FirebaseRefIdType';

class CreateSongRequestServiceDto implements RequestServiceDtoInterface {
  public title!: string;
  public artist?: string;
  public key?: string;
  public capo?: number;
  public tempo?: number;
  public timeSignature?: string;
  public strummingPattern?: string;
  public sheetContent!: string;
  public source!: SongSourceEnum;
  public firebaseRefId!: FirebaseRefIdType;
}

export default CreateSongRequestServiceDto;
