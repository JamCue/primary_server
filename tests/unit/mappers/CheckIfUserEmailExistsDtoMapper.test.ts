import CheckIfUserEmailExistsRequestServiceDto from '@dtos/CheckIfUserEmailExistsRequestServiceDto';
import CheckIfUserEmailExistsDtoMapper from '@mappers/CheckIfUserEmailExistsDtoMapper';

describe('CheckIfUserEmailExistsDtoMapper', () => {
  const email = 'user@example.com';

  const checkIfUserEmailExistsDtoMapper = new CheckIfUserEmailExistsDtoMapper();

  describe('map', () => {
    test('it handles', () => {
      const dto = checkIfUserEmailExistsDtoMapper.map({email});

      expect(dto).toStrictEqual(Object.assign(new CheckIfUserEmailExistsRequestServiceDto(), {email}));
    });
  });
});
