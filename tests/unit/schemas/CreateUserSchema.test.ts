import createUserSchema from '@schemas/CreateUserSchema';

describe('createUserSchema', () => {
  test('it trims names and normalizes emails to lowercase', () => {
    const result = createUserSchema.safeParse({name: '  Jane Doe  ', email: '  User@Example.com  '});

    expect(result).toMatchObject({success: true, data: {name: 'Jane Doe', email: 'user@example.com'}});
  });

  test.each([
    ['name', {name: undefined, email: 'user@example.com'}],
    ['name', {name: '', email: 'user@example.com'}],
    ['name', {name: 'a', email: 'user@example.com'}],
    ['name', {name: 'a'.repeat(101), email: 'user@example.com'}],
    ['email', {name: 'Jane Doe', email: undefined}],
    ['email', {name: 'Jane Doe', email: ''}],
    ['email', {name: 'Jane Doe', email: 'not-an-email'}],
  ])('it rejects an invalid %s', (_field, payload) => {
    expect(createUserSchema.safeParse(payload).success).toStrictEqual(false);
  });
});
