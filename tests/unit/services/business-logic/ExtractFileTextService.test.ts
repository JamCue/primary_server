import ExtractFileTextRequestServiceDto from '@dtos/ExtractFileTextRequestServiceDto';
import FileTypeInvalidException from '@exceptions/parameter-validation/FileTypeInvalidException';
import ExtractFileTextService from '@services/business-logic/ExtractFileTextService';
import ExtractDocTextService from '@services/business-logic/file-text-extraction/ExtractDocTextService';
import ExtractDocxTextService from '@services/business-logic/file-text-extraction/ExtractDocxTextService';
import ExtractPdfTextService from '@services/business-logic/file-text-extraction/ExtractPdfTextService';
import HttpResponseOk from '@value-objects/HttpResponseOk';

import mockResolvedValue from '../../utils/mockResolvedValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('ExtractFileTextService', () => {
  const buffer = Buffer.from('content');
  const text = '[Verse 1]\n          G        Em\nI found a love for me';

  const extractPdfTextService = new ExtractPdfTextService();
  const extractDocxTextService = new ExtractDocxTextService();
  const extractDocTextService = new ExtractDocTextService();
  const extractFileTextService = new ExtractFileTextService(
    extractPdfTextService,
    extractDocxTextService,
    extractDocTextService
  );

  const buildDto = (mimeType: string, fileExtension: string): ExtractFileTextRequestServiceDto =>
    Object.assign(new ExtractFileTextRequestServiceDto(), {buffer, mimeType, fileExtension});

  describe('handle', () => {
    test('it extracts text from a pdf file', async () => {
      extractPdfTextService.handle = mockResolvedValue(text);

      const dto = buildDto('application/pdf', '.pdf');

      await expect(extractFileTextService.handle(dto)).resolves.toStrictEqual(new HttpResponseOk({text}));
      expect(jest.spyOn(extractPdfTextService, 'handle')).toHaveBeenCalledWith(buffer);
    });

    test('it extracts text from a docx file', async () => {
      extractDocxTextService.handle = mockResolvedValue(text);

      const dto = buildDto('application/vnd.openxmlformats-officedocument.wordprocessingml.document', '.docx');

      await expect(extractFileTextService.handle(dto)).resolves.toStrictEqual(new HttpResponseOk({text}));
      expect(jest.spyOn(extractDocxTextService, 'handle')).toHaveBeenCalledWith(buffer);
    });

    test('it extracts text from a doc file', async () => {
      extractDocTextService.handle = mockResolvedValue(text);

      const dto = buildDto('application/msword', '.doc');

      await expect(extractFileTextService.handle(dto)).resolves.toStrictEqual(new HttpResponseOk({text}));
      expect(jest.spyOn(extractDocTextService, 'handle')).toHaveBeenCalledWith(buffer);
    });

    describe('when the file type is not supported', () => {
      test('it throws FileTypeInvalidException', async () => {
        const dto = buildDto('image/png', '.png');

        await expect(extractFileTextService.handle(dto)).rejects.toBeInstanceOf(FileTypeInvalidException);
      });
    });
  });
});
