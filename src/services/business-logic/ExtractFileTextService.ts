import ExtractFileTextRequestServiceDto from '@dtos/ExtractFileTextRequestServiceDto';
import FileTypeInvalidException from '@exceptions/parameter-validation/FileTypeInvalidException';
import HttpServiceInterface from '@i/HttpServiceInterface';
import ExtractDocTextService from '@services/business-logic/file-text-extraction/ExtractDocTextService';
import ExtractDocxTextService from '@services/business-logic/file-text-extraction/ExtractDocxTextService';
import ExtractPdfTextService from '@services/business-logic/file-text-extraction/ExtractPdfTextService';
import HttpResponseOk from '@value-objects/HttpResponseOk';

const PDF_MIME_TYPE = 'application/pdf';
const DOC_MIME_TYPE = 'application/msword';
const DOCX_MIME_TYPE = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

class ExtractFileTextService implements HttpServiceInterface {
  constructor(
    private readonly extractPdfTextService = new ExtractPdfTextService(),
    private readonly extractDocxTextService = new ExtractDocxTextService(),
    private readonly extractDocTextService = new ExtractDocTextService()
  ) {}

  /**
   * @throws FileTextExtractionFailedException
   * @throws parameter-validation/FileTypeInvalidException
   */
  public async handle(dto: ExtractFileTextRequestServiceDto): Promise<HttpResponseOk> {
    const text = await this.extractText(dto);

    return new HttpResponseOk({text});
  }

  private async extractText(dto: ExtractFileTextRequestServiceDto): Promise<string> {
    if (dto.fileExtension === '.pdf' || dto.mimeType === PDF_MIME_TYPE) {
      return this.extractPdfTextService.handle(dto.buffer);
    }

    if (dto.fileExtension === '.docx' || dto.mimeType === DOCX_MIME_TYPE) {
      return this.extractDocxTextService.handle(dto.buffer);
    }

    if (dto.fileExtension === '.doc' || dto.mimeType === DOC_MIME_TYPE) {
      return this.extractDocTextService.handle(dto.buffer);
    }

    throw new FileTypeInvalidException();
  }
}

export default ExtractFileTextService;
