import listSongsQuerySchema from '@schemas/ListSongsQuerySchema';
import {z} from 'zod';

type ListSongsQueryType = z.infer<typeof listSongsQuerySchema>;

export default ListSongsQueryType;
