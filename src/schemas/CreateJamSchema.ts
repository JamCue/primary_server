import JamAudienceAccessEnum from '@enums/JamAudienceAccessEnum';
import JamSessionTypeEnum from '@enums/JamSessionTypeEnum';
import {KEY_PATTERN, optionalInt, optionalPattern, optionalTrimmedString} from '@schemas/shared/songFieldSchemas';
import {z} from 'zod';

// A denormalized snapshot of the song, not a bare id — see JamSetlistSongType
// for why the jam keeps its own copy of these fields.
const jamSetlistSongSchema = z.object({
  songId: z.string().trim().min(1).max(100),
  title: z.string().trim().min(1).max(200),
  artist: optionalTrimmedString(200),
  key: optionalPattern(KEY_PATTERN, 10),
  capo: optionalInt(0, 12),
});

const createJamSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: optionalTrimmedString(500),
  songs: z.array(jamSetlistSongSchema).min(1).max(200),
  scheduledAt: z.coerce.date(),
  location: optionalTrimmedString(200),
  sessionType: z.nativeEnum(JamSessionTypeEnum).optional().default(JamSessionTypeEnum.OPEN),
  audienceAccess: z.nativeEnum(JamAudienceAccessEnum).optional().default(JamAudienceAccessEnum.ANYONE_CAN_REQUEST),
  strummingDisplay: z.boolean().optional().default(true),
  showChords: z.boolean().optional().default(true),
  capoDisplay: z.boolean().optional().default(true),
  requestLimit: z.number().int().min(1).max(50).optional().default(3),
  autoAdvance: z.boolean().optional().default(false),
});

export default createJamSchema;
