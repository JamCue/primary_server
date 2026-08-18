import FileTextExtractionFailedException from '@exceptions/FileTextExtractionFailedException';
import ExtractDocxTextService from '@services/business-logic/file-text-extraction/ExtractDocxTextService';
import mammoth from 'mammoth';

jest.mock('mammoth');

afterEach(() => {
  jest.restoreAllMocks();
});

describe('ExtractDocxTextService', () => {
  const buffer = Buffer.from('content');
  const extractDocxTextService = new ExtractDocxTextService();

  describe('handle', () => {
    test('it returns the extracted text', async () => {
      const value = '[Verse 1]\n          G        Em\nI found a love for me';

      mammoth.extractRawText = jest.fn().mockResolvedValue({value, messages: []});

      await expect(extractDocxTextService.handle(buffer)).resolves.toStrictEqual(value);
      expect(mammoth.extractRawText).toHaveBeenCalledWith({buffer});
    });

    describe('when parsing fails', () => {
      test('it throws FileTextExtractionFailedException', async () => {
        mammoth.extractRawText = jest.fn().mockRejectedValue(new Error('corrupt docx'));

        await expect(extractDocxTextService.handle(buffer)).rejects.toBeInstanceOf(FileTextExtractionFailedException);
      });
    });
  });
});
