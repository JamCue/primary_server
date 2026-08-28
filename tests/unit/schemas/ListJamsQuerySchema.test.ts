import listJamsQuerySchema from '@schemas/ListJamsQuerySchema';

describe('listJamsQuerySchema', () => {
  test('it defaults page and limit, leaving when unset, when nothing is given', () => {
    const result = listJamsQuerySchema.safeParse({});

    expect(result).toMatchObject({success: true, data: {page: 1, limit: 20}});
    if (result.success) {
      expect(result.data.when).toBeUndefined();
    }
  });

  test('it coerces page and limit from query-string values', () => {
    const result = listJamsQuerySchema.safeParse({when: 'upcoming', page: '2', limit: '10'});

    expect(result).toMatchObject({success: true, data: {when: 'upcoming', page: 2, limit: 10}});
  });

  test.each(['upcoming', 'past'])('it accepts when=%p', value => {
    const result = listJamsQuerySchema.safeParse({when: value});

    expect(result).toMatchObject({success: true, data: {when: value}});
  });

  test.each([
    ['when', {when: 'ongoing'}],
    ['page', {page: '0'}],
    ['limit', {limit: '101'}],
  ])('it rejects an invalid %s', (_field, query) => {
    expect(listJamsQuerySchema.safeParse(query).success).toStrictEqual(false);
  });
});
