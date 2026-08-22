import RequestServiceDtoInterface from '@i/RequestServiceDtoInterface';
import FirebaseRefIdType from '@t/parameter-validation/FirebaseRefIdType';
import SongIdType from '@t/parameter-validation/SongIdType';

class UpdateSongRequestServiceDto implements RequestServiceDtoInterface {
  public songId!: SongIdType;
  public title!: string;
  public artist?: string;
  public key?: string;
  public capo?: number;
  public tempo?: number;
  public timeSignature?: string;
  public strummingPattern?: string;
  public sheetContent!: string;
  public firebaseRefId!: FirebaseRefIdType;
}

export default UpdateSongRequestServiceDto;
