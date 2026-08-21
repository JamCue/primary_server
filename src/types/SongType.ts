import SongSourceEnum from '@enums/SongSourceEnum';

type SongType = {
  id: string;
  musicianId: string;
  title: string;
  artist?: string;
  key?: string;
  capo?: number;
  tempo?: number;
  timeSignature?: string;
  strummingPattern?: string;
  sheetContent: string;
  chords: string[];
  source: SongSourceEnum;
  createdAt: Date;
  updatedAt: Date;
};

export default SongType;
