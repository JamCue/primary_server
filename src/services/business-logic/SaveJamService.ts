import SaveJamServiceException from '@exceptions/inner/SaveJamServiceException';
import JamRepository from '@repositories/JamRepository';
import CreateJamPayloadType from '@t/CreateJamPayloadType';
import JamType from '@t/JamType';

class SaveJamService {
  constructor(private readonly jamRepository = new JamRepository()) {}

  /**
   * @throws inner/SaveJamServiceException
   */
  public async handle(payload: CreateJamPayloadType): Promise<JamType> {
    try {
      return await this.jamRepository.save(payload);
    } catch (e) {
      throw new SaveJamServiceException(e);
    }
  }
}

export default SaveJamService;
