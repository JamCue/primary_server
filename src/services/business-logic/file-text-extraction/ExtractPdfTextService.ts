import FileTextExtractionFailedException from '@exceptions/FileTextExtractionFailedException';
import pdf from 'pdf-parse';

class ExtractPdfTextService {
  /**
   * @throws FileTextExtractionFailedException
   */
  public async handle(buffer: Buffer): Promise<string> {
    try {
      const {text} = await pdf(buffer);

      return text;
    } catch (e) {
      throw new FileTextExtractionFailedException();
    }
  }
}

export default ExtractPdfTextService;
