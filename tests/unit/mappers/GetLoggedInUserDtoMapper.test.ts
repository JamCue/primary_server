import GetLoggedInUserRequestServiceDto from '@dtos/GetLoggedInUserRequestServiceDto';
import GetLoggedInUserDtoMapper from '@mappers/GetLoggedInUserDtoMapper';

describe('GetLoggedInUserDtoMapper', () => {
  const firebaseRefId = 'firebaseRefId';

  const getLoggedInUserDtoMapper = new GetLoggedInUserDtoMapper();

  describe('map', () => {
    test('it handles', () => {
      const dto = getLoggedInUserDtoMapper.map({firebaseRefId});

      expect(dto).toStrictEqual(Object.assign(new GetLoggedInUserRequestServiceDto(), {firebaseRefId}));
    });
  });
});
