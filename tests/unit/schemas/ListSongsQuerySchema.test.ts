import listSongsQuerySchema from '@schemas/ListSongsQuerySchema';

describe('listSongsQuerySchema', () => {
  test('it defaults sort, page and limit when nothing is given', () => {
    const result = listSongsQuerySchema.safeParse({});

    expect(result).toMatchObject({success: true, data: {sort: 'title', page: 1, limit: 20}});
  });

  test('it coerces page, limit and favorite from query-string values', () => {
    const result = listSongsQuerySchema.safeParse({
      search: 'wonder',
      key: 'G',
      favorite: 'true',
      sort: 'recent',
      page: '2',
      limit: '10',
    });

    expect(result).toMatchObject({
      success: true,
      data: {search: 'wonder', key: 'G', favorite: true, sort: 'recent', page: 2, limit: 10},
    });
  });

  test.each(['true', 'false'])('it parses favorite=%p as a real boolean, not JS truthiness', value => {
    const result = listSongsQuerySchema.safeParse({favorite: value});

    expect(result).toMatchObject({success: true, data: {favorite: value === 'true'}});
  });

  test.each([
    ['sort', {sort: 'newest'}],
    ['page', {page: '0'}],
    ['limit', {limit: '101'}],
    ['favorite', {favorite: 'nope'}],
  ])('it rejects an invalid %s', (_field, query) => {
    expect(listSongsQuerySchema.safeParse(query).success).toStrictEqual(false);
  });
});
