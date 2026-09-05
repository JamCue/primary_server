import GetJamByIdRequestServiceDto from '@dtos/GetJamByIdRequestServiceDto';
import GetJamByIdDtoMapper from '@mappers/GetJamByIdDtoMapper';

describe('GetJamByIdDtoMapper', () => {
  const jamId = '507f1f77bcf86cd799439011';
  const firebaseRefId = 'firebaseRefId';

  const getJamByIdDtoMapper = new GetJamByIdDtoMapper();

  describe('map', () => {
    test('it handles', () => {
      const dto = getJamByIdDtoMapper.map(jamId, firebaseRefId);

      expect(dto).toStrictEqual(Object.assign(new GetJamByIdRequestServiceDto(), {jamId, firebaseRefId}));
    });
  });
});
