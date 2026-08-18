import ExtractFileTextRequestServiceDto from '@dtos/ExtractFileTextRequestServiceDto';
import ExtractFileTextDtoMapper from '@mappers/ExtractFileTextDtoMapper';

describe('ExtractFileTextDtoMapper', () => {
  const buffer = Buffer.from('content');
  const mimeType = 'application/pdf';
  const fileExtension = '.pdf';

  const extractFileTextDtoMapper = new ExtractFileTextDtoMapper();

  describe('map', () => {
    test('it handles', () => {
      const dto = extractFileTextDtoMapper.map({buffer, mimeType, fileExtension});

      expect(dto).toStrictEqual(
        Object.assign(new ExtractFileTextRequestServiceDto(), {buffer, mimeType, fileExtension})
      );
    });
  });
});
