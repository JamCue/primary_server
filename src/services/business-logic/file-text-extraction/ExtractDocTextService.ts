import FileTextExtractionFailedException from '@exceptions/FileTextExtractionFailedException';
import WordExtractor from 'word-extractor';

class ExtractDocTextService {
  /**
   * @throws FileTextExtractionFailedException
   */
  public async handle(buffer: Buffer): Promise<string> {
    try {
      const document = await new WordExtractor().extract(buffer);

      return document.getBody();
    } catch (e) {
      throw new FileTextExtractionFailedException();
    }
  }
}

export default ExtractDocTextService;
