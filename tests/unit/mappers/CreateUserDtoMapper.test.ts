import CreateUserRequestServiceDto from '@dtos/CreateUserRequestServiceDto';
import CreateUserDtoMapper from '@mappers/CreateUserDtoMapper';

describe('CreateUserDtoMapper', () => {
  const name = 'name';
  const email = 'user@example.com';
  const firebaseRefId = 'firebaseRefId';

  const createUserDtoMapper = new CreateUserDtoMapper();

  describe('map', () => {
    test('it handles', () => {
      const dto = createUserDtoMapper.map({name, email, firebaseRefId});

      expect(dto).toStrictEqual(Object.assign(new CreateUserRequestServiceDto(), {name, email, firebaseRefId}));
    });
  });
});
