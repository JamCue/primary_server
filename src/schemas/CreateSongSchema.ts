import SongSourceEnum from '@enums/SongSourceEnum';
import {z} from 'zod';

const KEY_PATTERN = /^[A-G](#|b)?m?$/;
const TIME_SIGNATURE_PATTERN = /^\d{1,2}\/\d{1,2}$/;

// Body values are normalized before validation: an explicit `null` or `''`
// on an optional field is treated the same as the key being omitted.
const emptyToUndefined = (value: unknown): unknown => (value === null || value === '' ? undefined : value);

const optionalTrimmedString = (maxLength: number): z.ZodType<string | undefined, z.ZodTypeDef, unknown> =>
  z.preprocess(emptyToUndefined, z.string().trim().max(maxLength).optional());

const optionalPattern = (pattern: RegExp, maxLength: number): z.ZodType<string | undefined, z.ZodTypeDef, unknown> =>
  z.preprocess(emptyToUndefined, z.string().trim().max(maxLength).regex(pattern).optional());

const optionalInt = (min: number, max: number): z.ZodType<number | undefined, z.ZodTypeDef, unknown> =>
  z.preprocess(emptyToUndefined, z.number().int().min(min).max(max).optional());

const createSongSchema = z.object({
  title: z.string().trim().min(1).max(200),
  artist: optionalTrimmedString(200),
  key: optionalPattern(KEY_PATTERN, 10),
  capo: optionalInt(0, 12),
  tempo: optionalInt(20, 300),
  timeSignature: optionalPattern(TIME_SIGNATURE_PATTERN, 10),
  strummingPattern: optionalTrimmedString(100),
  // Whitespace inside sheetContent is significant (it's what aligns chords
  // above lyrics), so it's validated but never trimmed or otherwise altered.
  sheetContent: z.string().min(1).max(50_000),
  source: z.nativeEnum(SongSourceEnum),
});

export default createSongSchema;
