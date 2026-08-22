import JamAudienceAccessEnum from '@enums/JamAudienceAccessEnum';
import JamJoinOptionEnum from '@enums/JamJoinOptionEnum';
import JamSessionTypeEnum from '@enums/JamSessionTypeEnum';
import JamSetlistSongType from '@t/JamSetlistSongType';

type JamType = {
  id: string;
  musicianId: string;
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
  // Short, human-typeable code that resolves to this jam for the QR/link
  // join flow. Generated server-side (GenerateJamJoinCodeService) — never
  // client-supplied.
  joinCode: string;
  createdAt: Date;
  updatedAt: Date;
};

export default JamType;
