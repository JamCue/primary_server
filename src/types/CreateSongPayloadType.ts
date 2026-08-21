import SongType from '@t/SongType';

type CreateSongPayloadType = Omit<SongType, 'id' | 'createdAt' | 'updatedAt'>;

export default CreateSongPayloadType;
