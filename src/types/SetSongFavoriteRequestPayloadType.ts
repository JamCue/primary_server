import setSongFavoriteSchema from '@schemas/SetSongFavoriteSchema';
import {z} from 'zod';

type SetSongFavoriteRequestPayloadType = z.infer<typeof setSongFavoriteSchema>;

export default SetSongFavoriteRequestPayloadType;
