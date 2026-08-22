import {z} from 'zod';

const setSongFavoriteSchema = z.object({
  isFavorite: z.boolean(),
});

export default setSongFavoriteSchema;
