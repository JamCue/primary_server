import JamType from '@t/JamType';

type CreateJamPayloadType = Omit<JamType, 'id' | 'createdAt' | 'updatedAt'>;

export default CreateJamPayloadType;
