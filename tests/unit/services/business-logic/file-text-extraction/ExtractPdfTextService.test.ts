import FileTextExtractionFailedException from '@exceptions/FileTextExtractionFailedException';
import ExtractPdfTextService from '@services/business-logic/file-text-extraction/ExtractPdfTextService';
import pdf from 'pdf-parse';

jest.mock('pdf-parse');

afterEach(() => {
  jest.restoreAllMocks();
});

describe('ExtractPdfTextService', () => {
  const buffer = Buffer.from('content');
  const extractPdfTextService = new ExtractPdfTextService();

  describe('handle', () => {
    test('it returns the extracted text', async () => {
      const text = '[Verse 1]\n          G        Em\nI found a love for me';

      (pdf as unknown as jest.Mock).mockResolvedValue({text});

      await expect(extractPdfTextService.handle(buffer)).resolves.toStrictEqual(text);
      expect(pdf).toHaveBeenCalledWith(buffer);
    });

    describe('when parsing fails', () => {
      test('it throws FileTextExtractionFailedException', async () => {
        (pdf as unknown as jest.Mock).mockRejectedValue(new Error('corrupt pdf'));

        await expect(extractPdfTextService.handle(buffer)).rejects.toBeInstanceOf(FileTextExtractionFailedException);
      });
    });
  });
});
