import updateSongSchema from '@schemas/UpdateSongSchema';
import {z} from 'zod';

type UpdateSongRequestPayloadType = z.infer<typeof updateSongSchema>;

export default UpdateSongRequestPayloadType;
