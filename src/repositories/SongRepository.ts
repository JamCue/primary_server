import SongSourceEnum from '@enums/SongSourceEnum';
import DbException from '@exceptions/inner/DbException';
import AbstractRepository from '@repositories/AbstractRepository';
import CreateSongPayloadType from '@t/CreateSongPayloadType';
import ListSongsFilterType from '@t/ListSongsFilterType';
import SongType from '@t/SongType';
import UpdateSongPayloadType from '@t/UpdateSongPayloadType';
import {FilterQuery, Schema} from 'mongoose';

// The optional song fields an edit may clear — sent as `undefined` in
// UpdateSongPayloadType, which `update()` below translates into a Mongo
// $unset rather than a $set (silently dropping them would otherwise never
// remove a previously-set value from the document).
const OPTIONAL_SONG_FIELDS = ['artist', 'key', 'capo', 'tempo', 'timeSignature', 'strummingPattern'] as const;

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
  isFavorite: boolean;
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
    isFavorite: {type: Boolean, required: true, default: false},
  },
  {timestamps: {createdAt: true, updatedAt: true}}
);

// Escapes regex metacharacters so search input is matched literally.
const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

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

  public async getById(songId: string): Promise<SongType | null> {
    try {
      const song = await this.collection.findById(songId).lean();

      return song ? this.toSongType(song as SongDocumentType) : null;
    } catch (e: unknown) {
      throw new DbException(e);
    }
  }

  public async update(songId: string, payload: UpdateSongPayloadType): Promise<SongType | null> {
    try {
      const set: Partial<SongDocumentType> = {
        title: payload.title,
        sheetContent: payload.sheetContent,
        chords: payload.chords,
      };
      const unset: Partial<Record<(typeof OPTIONAL_SONG_FIELDS)[number], ''>> = {};

      for (const field of OPTIONAL_SONG_FIELDS) {
        if (payload[field] === undefined) {
          unset[field] = '';
        } else {
          (set as Record<string, unknown>)[field] = payload[field];
        }
      }

      const song = await this.collection.findByIdAndUpdate(songId, {$set: set, $unset: unset}, {new: true}).lean();

      return song ? this.toSongType(song as SongDocumentType) : null;
    } catch (e: unknown) {
      throw new DbException(e);
    }
  }

  public async updateFavorite(songId: string, isFavorite: boolean): Promise<SongType | null> {
    try {
      const song = await this.collection.findByIdAndUpdate(songId, {isFavorite}, {new: true}).lean();

      return song ? this.toSongType(song as SongDocumentType) : null;
    } catch (e: unknown) {
      throw new DbException(e);
    }
  }

  public async list(filter: ListSongsFilterType): Promise<{songs: SongType[]; total: number}> {
    try {
      const query = this.buildListFilterQuery(filter);
      const sort: Record<string, 1 | -1> = filter.sort === 'recent' ? {createdAt: -1} : {title: 1};
      const skip = (filter.page - 1) * filter.limit;

      const [songs, total] = await Promise.all([
        this.collection.find(query).sort(sort).skip(skip).limit(filter.limit).lean(),
        this.collection.countDocuments(query),
      ]);

      return {songs: (songs as SongDocumentType[]).map(song => this.toSongType(song)), total};
    } catch (e: unknown) {
      throw new DbException(e);
    }
  }

  private buildListFilterQuery(filter: ListSongsFilterType): FilterQuery<SongType> {
    const query: FilterQuery<SongType> = {musicianId: filter.musicianId};

    if (filter.key) {
      query.key = filter.key;
    }

    if (filter.favorite !== undefined) {
      query.isFavorite = filter.favorite;
    }

    if (filter.search) {
      const pattern = new RegExp(escapeRegExp(filter.search), 'i');

      query.$or = [{title: pattern}, {artist: pattern}, {key: pattern}];
    }

    return query;
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
      isFavorite: song.isFavorite,
      createdAt: song.createdAt,
      updatedAt: song.updatedAt,
    };
  }
}

export default SongRepository;
