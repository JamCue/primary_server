import FileTooLargeException from '@exceptions/parameter-validation/FileTooLargeException';
import FileUploadFailedException from '@exceptions/parameter-validation/FileUploadFailedException';
import LogApiErrorService from '@services/LogApiErrorService';
import Busboy from 'busboy';
import {NextFunction, Request, Response} from 'express';

const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024;
const UPLOAD_FIELD_NAME = 'file';

/**
 * Parses a single multipart file upload into `req.file`, in the same shape
 * multer would produce.
 *
 * Note: this deliberately does NOT use multer directly. The Google Cloud
 * Functions Framework (see src/index.ts, which exports the raw Express app)
 * buffers the entire request body — multipart included — into `req.rawBody`
 * before the Express app ever sees the request, so by the time a
 * stream-based parser like multer tries to read from `req`, the underlying
 * stream has already been fully consumed and yields no data. Busboy is fed
 * that buffered body directly instead. When `req.rawBody` isn't present
 * (e.g. running outside the Functions Framework), it falls back to piping
 * the live request stream.
 */
class UploadFileMiddleware {
  constructor(private readonly logApiErrorService = new LogApiErrorService()) {}

  public run = (req: Request, res: Response, next: NextFunction): void => {
    let fileTooLarge = false;

    let busboy: Busboy.Busboy;

    try {
      busboy = Busboy({
        headers: req.headers,
        limits: {fileSize: MAX_FILE_SIZE_BYTES, files: 1},
      });
    } catch (e) {
      this.logApiErrorService.handle(e, req);

      return next(new FileUploadFailedException());
    }

    busboy.on('file', (fieldname, fileStream, info) => {
      if (fieldname !== UPLOAD_FIELD_NAME) {
        fileStream.resume();
        return;
      }

      const chunks: Buffer[] = [];

      fileStream.on('data', (chunk: Buffer) => chunks.push(chunk));

      fileStream.on('close', () => {
        if (fileStream.truncated) {
          fileTooLarge = true;
          return;
        }

        const buffer = Buffer.concat(chunks);

        req.file = {
          fieldname,
          originalname: info.filename,
          encoding: info.encoding,
          mimetype: info.mimeType,
          buffer,
          size: buffer.length,
        } as Express.Multer.File;
      });
    });

    busboy.on('error', (e: unknown) => {
      this.logApiErrorService.handle(e, req);
      next(new FileUploadFailedException());
    });

    busboy.on('close', () => {
      if (fileTooLarge) {
        return next(new FileTooLargeException());
      }

      next();
    });

    if (req.rawBody) {
      busboy.end(req.rawBody);
    } else {
      req.pipe(busboy);
    }
  };
}

export default UploadFileMiddleware;
