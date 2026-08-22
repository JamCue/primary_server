// A snapshot of the song fields relevant to a jam's setlist, captured at
// the moment the jam is created (rather than a live reference to the songs
// collection) — so a jam's setlist keeps showing what the artist actually
// picked even if the source song is later edited, renamed or deleted.
type JamSetlistSongType = {
  songId: string;
  title: string;
  artist?: string;
  key?: string;
  capo?: number;
};

export default JamSetlistSongType;
