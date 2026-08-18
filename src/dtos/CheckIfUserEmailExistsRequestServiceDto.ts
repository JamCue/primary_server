import RequestServiceDtoInterface from '@i/RequestServiceDtoInterface';
import UserEmailType from '@t/parameter-validation/UserEmailType';

class CheckIfUserEmailExistsRequestServiceDto implements RequestServiceDtoInterface {
  public email!: UserEmailType;
}

export default CheckIfUserEmailExistsRequestServiceDto;
