import FileMissingException from '@exceptions/parameter-validation/FileMissingException';
import FileTypeInvalidException from '@exceptions/parameter-validation/FileTypeInvalidException';
import {Request} from 'express';
import path from 'path';

class GetUploadedFileFromRequestService {
  private static readonly ALLOWED_MIME_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  private static readonly ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

  /**
   * @throws parameter-validation/FileMissingException
   * @throws parameter-validation/FileTypeInvalidException
   */
  public handle(req: Request): Express.Multer.File {
    const file = req.file;

    if (!file || file.size === 0) {
      throw new FileMissingException();
    }

    const extension = path.extname(file.originalname).toLowerCase();
    const mimeTypeAllowed = GetUploadedFileFromRequestService.ALLOWED_MIME_TYPES.includes(file.mimetype);
    const extensionAllowed = GetUploadedFileFromRequestService.ALLOWED_EXTENSIONS.includes(extension);

    if (!mimeTypeAllowed && !extensionAllowed) {
      throw new FileTypeInvalidException();
    }

    return file;
  }
}

export default GetUploadedFileFromRequestService;
