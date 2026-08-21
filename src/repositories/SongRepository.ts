import SongSourceEnum from '@enums/SongSourceEnum';
import DbException from '@exceptions/inner/DbException';
import AbstractRepository from '@repositories/AbstractRepository';
import CreateSongPayloadType from '@t/CreateSongPayloadType';
import SongType from '@t/SongType';
import {Schema} from 'mongoose';

type SongDocumentType = {
  _id: unknown;
  musicianId: unknown;
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

const songSchema = new Schema<SongType>(
  {
    // Stored as the musician's stringified user id (see UserRepository,
    // which stringifies Mongo's ObjectId the same way), not a native
    // ObjectId reference, to match SongType.musicianId being a string.
    musicianId: {type: String, required: true},
    title: {type: String, required: true},
    artist: {type: String},
    key: {type: String},
    capo: {type: Number},
    tempo: {type: Number},
    timeSignature: {type: String},
    strummingPattern: {type: String},
    sheetContent: {type: String, required: true},
    chords: {type: [String], default: []},
    source: {type: String, enum: Object.values(SongSourceEnum), required: true},
  },
  {timestamps: {createdAt: true, updatedAt: true}}
);

class SongRepository extends AbstractRepository<SongType> {
  constructor() {
    super('songs', songSchema);
  }

  public async save(payload: CreateSongPayloadType): Promise<SongType> {
    try {
      const song = await this.collection.create(payload);

      return this.toSongType(song);
    } catch (e: unknown) {
      throw new DbException(e);
    }
  }

  private toSongType(song: SongDocumentType): SongType {
    return {
      id: String(song._id),
      musicianId: String(song.musicianId),
      title: song.title,
      artist: song.artist,
      key: song.key,
      capo: song.capo,
      tempo: song.tempo,
      timeSignature: song.timeSignature,
      strummingPattern: song.strummingPattern,
      sheetContent: song.sheetContent,
      chords: song.chords,
      source: song.source,
      createdAt: song.createdAt,
      updatedAt: song.updatedAt,
    };
  }
}

export default SongRepository;
