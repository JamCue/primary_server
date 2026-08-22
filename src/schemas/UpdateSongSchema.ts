import {
  KEY_PATTERN,
  optionalInt,
  optionalPattern,
  optionalTrimmedString,
  TIME_SIGNATURE_PATTERN,
} from '@schemas/shared/songFieldSchemas';
import {z} from 'zod';

// Same shape as CreateSongSchema minus `source`, which is set once at
// creation and never edited. Unlike creation, every field but `title` and
// `sheetContent` is optional on the *value* itself (not just "may be
// omitted from the body") — an editor may clear a previously-set field
// (e.g. remove the capo), which the repository translates into an unset.
const updateSongSchema = z.object({
  title: z.string().trim().min(1).max(200),
  artist: optionalTrimmedString(200),
  key: optionalPattern(KEY_PATTERN, 10),
  capo: optionalInt(0, 12),
  tempo: optionalInt(20, 300),
  timeSignature: optionalPattern(TIME_SIGNATURE_PATTERN, 10),
  strummingPattern: optionalTrimmedString(100),
  sheetContent: z.string().min(1).max(50_000),
});

export default updateSongSchema;
