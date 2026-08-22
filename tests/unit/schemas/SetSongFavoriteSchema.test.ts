import setSongFavoriteSchema from '@schemas/SetSongFavoriteSchema';

describe('setSongFavoriteSchema', () => {
  test.each([true, false])('it accepts isFavorite %p', isFavorite => {
    expect(setSongFavoriteSchema.safeParse({isFavorite})).toMatchObject({success: true, data: {isFavorite}});
  });

  test.each([undefined, null, 'true', 1])('it rejects a non-boolean isFavorite %p', isFavorite => {
    expect(setSongFavoriteSchema.safeParse({isFavorite}).success).toStrictEqual(false);
  });
});
