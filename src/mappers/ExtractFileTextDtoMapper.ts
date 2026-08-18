import ExtractFileTextRequestServiceDto from '@dtos/ExtractFileTextRequestServiceDto';

class ExtractFileTextDtoMapper {
  public map({
    buffer,
    mimeType,
    fileExtension,
  }: {
    buffer: Buffer;
    mimeType: string;
    fileExtension: string;
  }): ExtractFileTextRequestServiceDto {
    const dto = new ExtractFileTextRequestServiceDto();

    dto.buffer = buffer;
    dto.mimeType = mimeType;
    dto.fileExtension = fileExtension;

    return dto;
  }
}

export default ExtractFileTextDtoMapper;
