import FileTextExtractionFailedException from '@exceptions/FileTextExtractionFailedException';
import mammoth from 'mammoth';

class ExtractDocxTextService {
  /**
   * @throws FileTextExtractionFailedException
   */
  public async handle(buffer: Buffer): Promise<string> {
    try {
      const {value} = await mammoth.extractRawText({buffer});

      return value;
    } catch (e) {
      throw new FileTextExtractionFailedException();
    }
  }
}

export default ExtractDocxTextService;
