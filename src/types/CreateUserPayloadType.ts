import createUserSchema from '@schemas/CreateUserSchema';
import {z} from 'zod';

type CreateUserPayloadType = z.infer<typeof createUserSchema>;

export default CreateUserPayloadType;
