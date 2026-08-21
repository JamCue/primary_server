import createSongSchema from '@schemas/CreateSongSchema';
import {z} from 'zod';

type CreateSongRequestPayloadType = z.infer<typeof createSongSchema>;

export default CreateSongRequestPayloadType;
