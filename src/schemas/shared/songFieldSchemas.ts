import {z} from 'zod';

// Shared between CreateSongSchema and UpdateSongSchema so the two stay in
// sync — a song's editable fields have the same shape/limits whether it's
// being created or edited.

export const KEY_PATTERN = /^[A-G](#|b)?m?$/;
export const TIME_SIGNATURE_PATTERN = /^\d{1,2}\/\d{1,2}$/;

// Body values are normalized before validation: an explicit `null` or `''`
// on an optional field is treated the same as the key being omitted.
const emptyToUndefined = (value: unknown): unknown => (value === null || value === '' ? undefined : value);

export const optionalTrimmedString = (maxLength: number): z.ZodType<string | undefined, z.ZodTypeDef, unknown> =>
  z.preprocess(emptyToUndefined, z.string().trim().max(maxLength).optional());

export const optionalPattern = (
  pattern: RegExp,
  maxLength: number
): z.ZodType<string | undefined, z.ZodTypeDef, unknown> =>
  z.preprocess(emptyToUndefined, z.string().trim().max(maxLength).regex(pattern).optional());

export const optionalInt = (min: number, max: number): z.ZodType<number | undefined, z.ZodTypeDef, unknown> =>
  z.preprocess(emptyToUndefined, z.number().int().min(min).max(max).optional());
