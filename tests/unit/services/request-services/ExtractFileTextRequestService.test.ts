import ExtractFileTextRequestServiceDto from '@dtos/ExtractFileTextRequestServiceDto';
import ExtractFileTextDtoMapper from '@mappers/ExtractFileTextDtoMapper';
import GetUploadedFileFromRequestService from '@services/parameter-validation/GetUploadedFileFromRequestService';
import ExtractFileTextRequestService from '@services/request-services/ExtractFileTextRequestService';
import {Request} from 'express';

import mockReturnValue from '../../utils/mockReturnValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('ExtractFileTextRequestService', () => {
  const buffer = Buffer.from('content');
  const file = {
    originalname: 'song.PDF',
    mimetype: 'application/pdf',
    buffer,
  } as Express.Multer.File;
  const req = {file} as Request;
  const dto = Object.assign(new ExtractFileTextRequestServiceDto(), {
    buffer,
    mimeType: 'application/pdf',
    fileExtension: '.pdf',
  });

  const getUploadedFileFromRequestService = new GetUploadedFileFromRequestService();
  const mapper = new ExtractFileTextDtoMapper();
  const extractFileTextRequestService = new ExtractFileTextRequestService(getUploadedFileFromRequestService, mapper);

  describe('handle', () => {
    test('it handles', async () => {
      getUploadedFileFromRequestService.handle = mockReturnValue(file);
      mapper.map = mockReturnValue(dto);

      await expect(extractFileTextRequestService.handle(req)).resolves.toStrictEqual(dto);
      expect(jest.spyOn(getUploadedFileFromRequestService, 'handle')).toHaveBeenCalledWith(req);
      expect(jest.spyOn(mapper, 'map')).toHaveBeenCalledWith({
        buffer,
        mimeType: 'application/pdf',
        fileExtension: '.pdf',
      });
    });
  });
});
