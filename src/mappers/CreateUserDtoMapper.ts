import CreateUserRequestServiceDto from '@dtos/CreateUserRequestServiceDto';
import FirebaseRefIdType from '@t/parameter-validation/FirebaseRefIdType';
import UserEmailType from '@t/parameter-validation/UserEmailType';
import UserNameType from '@t/parameter-validation/UserNameType';

class CreateUserDtoMapper {
  public map({
    name,
    email,
    firebaseRefId,
  }: {
    name: UserNameType;
    email: UserEmailType;
    firebaseRefId: FirebaseRefIdType;
  }): CreateUserRequestServiceDto {
    const dto = new CreateUserRequestServiceDto();

    dto.name = name;
    dto.email = email;
    dto.firebaseRefId = firebaseRefId;

    return dto;
  }
}

export default CreateUserDtoMapper;
