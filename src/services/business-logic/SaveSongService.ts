import SaveSongServiceException from '@exceptions/inner/SaveSongServiceException';
import SongRepository from '@repositories/SongRepository';
import CreateSongPayloadType from '@t/CreateSongPayloadType';
import SongType from '@t/SongType';

class SaveSongService {
  constructor(private readonly songRepository = new SongRepository()) {}

  /**
   * @throws inner/SaveSongServiceException
   */
  public async handle(payload: CreateSongPayloadType): Promise<SongType> {
    try {
      return await this.songRepository.save(payload);
    } catch (e) {
      throw new SaveSongServiceException(e);
    }
  }
}

export default SaveSongService;
