import CheckIfUserEmailExistsRequestServiceDto from '@dtos/CheckIfUserEmailExistsRequestServiceDto';
import UserEmailType from '@t/parameter-validation/UserEmailType';

class CheckIfUserEmailExistsDtoMapper {
  public map({email}: {email: UserEmailType}): CheckIfUserEmailExistsRequestServiceDto {
    const dto = new CheckIfUserEmailExistsRequestServiceDto();

    dto.email = email;

    return dto;
  }
}

export default CheckIfUserEmailExistsDtoMapper;
