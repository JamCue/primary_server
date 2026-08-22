import createJamSchema from '@schemas/CreateJamSchema';
import {z} from 'zod';

type CreateJamRequestPayloadType = z.infer<typeof createJamSchema>;

export default CreateJamRequestPayloadType;
