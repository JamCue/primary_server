import ExtractFileTextRequestServiceDto from '@dtos/ExtractFileTextRequestServiceDto';
import RequestServiceInterface from '@i/RequestServiceInterface';
import ExtractFileTextDtoMapper from '@mappers/ExtractFileTextDtoMapper';
import GetUploadedFileFromRequestService from '@services/parameter-validation/GetUploadedFileFromRequestService';
import {Request} from 'express';
import path from 'path';

class ExtractFileTextRequestService implements RequestServiceInterface {
  constructor(
    private readonly getUploadedFileFromRequestService = new GetUploadedFileFromRequestService(),
    private readonly mapper = new ExtractFileTextDtoMapper()
  ) {}

  /**
   * @throws parameter-validation/FileMissingException
   * @throws parameter-validation/FileTypeInvalidException
   */
  public async handle(req: Request): Promise<ExtractFileTextRequestServiceDto> {
    const file = this.getUploadedFileFromRequestService.handle(req);

    return this.mapper.map({
      buffer: file.buffer,
      mimeType: file.mimetype,
      fileExtension: path.extname(file.originalname).toLowerCase(),
    });
  }
}

export default ExtractFileTextRequestService;
