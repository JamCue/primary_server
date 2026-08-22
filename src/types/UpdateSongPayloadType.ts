import SongType from '@t/SongType';

type UpdateSongPayloadType = Pick<
  SongType,
  'title' | 'artist' | 'key' | 'capo' | 'tempo' | 'timeSignature' | 'strummingPattern' | 'sheetContent' | 'chords'
>;

export default UpdateSongPayloadType;
