import ListJamsRequestServiceDto from '@dtos/ListJamsRequestServiceDto';
import ListJamsDtoMapper from '@mappers/ListJamsDtoMapper';

describe('ListJamsDtoMapper', () => {
  const query = {when: 'upcoming' as const, page: 2, limit: 10};
  const firebaseRefId = 'firebaseRefId';

  const listJamsDtoMapper = new ListJamsDtoMapper();

  describe('map', () => {
    test('it handles', () => {
      const dto = listJamsDtoMapper.map(query, firebaseRefId);

      expect(dto).toStrictEqual(Object.assign(new ListJamsRequestServiceDto(), query, {firebaseRefId}));
    });
  });
});
