import listJamsQuerySchema from '@schemas/ListJamsQuerySchema';
import {z} from 'zod';

type ListJamsQueryType = z.infer<typeof listJamsQuerySchema>;

export default ListJamsQueryType;
