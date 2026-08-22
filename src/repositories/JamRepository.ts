import JamAudienceAccessEnum from '@enums/JamAudienceAccessEnum';
import JamJoinOptionEnum from '@enums/JamJoinOptionEnum';
import JamSessionTypeEnum from '@enums/JamSessionTypeEnum';
import DbException from '@exceptions/inner/DbException';
import AbstractRepository from '@repositories/AbstractRepository';
import CreateJamPayloadType from '@t/CreateJamPayloadType';
import JamSetlistSongType from '@t/JamSetlistSongType';
import JamType from '@t/JamType';
import {Schema} from 'mongoose';

type JamDocumentType = {
  _id: unknown;
  musicianId: unknown;
  title: string;
  description?: string;
  songs: JamSetlistSongType[];
  scheduledAt: Date;
  location?: string;
  sessionType: JamSessionTypeEnum;
  audienceAccess: JamAudienceAccessEnum;
  joinOption: JamJoinOptionEnum;
  strummingDisplay: boolean;
  showChords: boolean;
  capoDisplay: boolean;
  requestLimit: number;
  autoAdvance: boolean;
  joinCode: string;
  createdAt: Date;
  updatedAt: Date;
};

// No own `_id` — a setlist song is just a snapshot embedded in the jam, not
// an independently addressable document.
const jamSetlistSongSchema = new Schema<JamSetlistSongType>(
  {
    songId: {type: String, required: true},
    title: {type: String, required: true},
    artist: {type: String},
    key: {type: String},
    capo: {type: Number},
  },
  {_id: false}
);

const jamSchema = new Schema<JamType>(
  {
    // Stored as the musician's stringified user id, same convention as
    // SongRepository.musicianId.
    musicianId: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String},
    songs: {type: [jamSetlistSongSchema], default: []},
    scheduledAt: {type: Date, required: true},
    location: {type: String},
    sessionType: {type: String, enum: Object.values(JamSessionTypeEnum), required: true},
    audienceAccess: {type: String, enum: Object.values(JamAudienceAccessEnum), required: true},
    joinOption: {type: String, enum: Object.values(JamJoinOptionEnum), required: true},
    strummingDisplay: {type: Boolean, required: true, default: true},
    showChords: {type: Boolean, required: true, default: true},
    capoDisplay: {type: Boolean, required: true, default: true},
    requestLimit: {type: Number, required: true, default: 3},
    autoAdvance: {type: Boolean, required: true, default: false},
    joinCode: {type: String, required: true, unique: true},
  },
  {timestamps: {createdAt: true, updatedAt: true}}
);

class JamRepository extends AbstractRepository<JamType> {
  constructor() {
    super('jams', jamSchema);
  }

  public async save(payload: CreateJamPayloadType): Promise<JamType> {
    try {
      const jam = await this.collection.create(payload);

      return this.toJamType(jam);
    } catch (e: unknown) {
      throw new DbException(e);
    }
  }

  private toJamType(jam: JamDocumentType): JamType {
    return {
      id: String(jam._id),
      musicianId: String(jam.musicianId),
      title: jam.title,
      description: jam.description,
      songs: jam.songs,
      scheduledAt: jam.scheduledAt,
      location: jam.location,
      sessionType: jam.sessionType,
      audienceAccess: jam.audienceAccess,
      joinOption: jam.joinOption,
      strummingDisplay: jam.strummingDisplay,
      showChords: jam.showChords,
      capoDisplay: jam.capoDisplay,
      requestLimit: jam.requestLimit,
      autoAdvance: jam.autoAdvance,
      joinCode: jam.joinCode,
      createdAt: jam.createdAt,
      updatedAt: jam.updatedAt,
    };
  }
}

export default JamRepository;
