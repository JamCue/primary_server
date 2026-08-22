import {z} from 'zod';

// Express parses every query string value as a string (or array of
// strings), so booleans/numbers need explicit coercion. `z.coerce.boolean()`
// is unusable here since JS `Boolean('false')` is `true` — only the literal
// strings 'true'/'false' are treated as booleans, anything else falls
// through to Zod's own type check and fails validation as expected.
const booleanQueryParam = (): z.ZodType<boolean | undefined, z.ZodTypeDef, unknown> =>
  z.preprocess(value => {
    if (value === 'true') {
      return true;
    }

    if (value === 'false') {
      return false;
    }

    return value;
  }, z.boolean().optional());

const listSongsQuerySchema = z.object({
  search: z.string().trim().min(1).max(200).optional(),
  key: z.string().trim().min(1).max(10).optional(),
  favorite: booleanQueryParam(),
  sort: z.enum(['recent', 'title']).optional().default('title'),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
});

export default listSongsQuerySchema;
