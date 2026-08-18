import RequestServiceDtoInterface from '@i/RequestServiceDtoInterface';

class ExtractFileTextRequestServiceDto implements RequestServiceDtoInterface {
  public buffer!: Buffer;
  public mimeType!: string;
  public fileExtension!: string;
}

export default ExtractFileTextRequestServiceDto;
