import FileTextExtractionFailedException from '@exceptions/FileTextExtractionFailedException';
import ExtractDocTextService from '@services/business-logic/file-text-extraction/ExtractDocTextService';

const mockExtract = jest.fn();

jest.mock('word-extractor', () =>
  jest.fn().mockImplementation(() => ({
    extract: mockExtract,
  }))
);

afterEach(() => {
  jest.restoreAllMocks();
  mockExtract.mockReset();
});

describe('ExtractDocTextService', () => {
  const buffer = Buffer.from('content');
  const extractDocTextService = new ExtractDocTextService();

  describe('handle', () => {
    test('it returns the extracted text', async () => {
      const text = '[Verse 1]\n          G        Em\nI found a love for me';

      mockExtract.mockResolvedValue({getBody: () => text});

      await expect(extractDocTextService.handle(buffer)).resolves.toStrictEqual(text);
      expect(mockExtract).toHaveBeenCalledWith(buffer);
    });

    describe('when parsing fails', () => {
      test('it throws FileTextExtractionFailedException', async () => {
        mockExtract.mockRejectedValue(new Error('corrupt doc'));

        await expect(extractDocTextService.handle(buffer)).rejects.toBeInstanceOf(FileTextExtractionFailedException);
      });
    });
  });
});
