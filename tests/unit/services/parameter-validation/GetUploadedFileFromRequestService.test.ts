import FileMissingException from '@exceptions/parameter-validation/FileMissingException';
import FileTypeInvalidException from '@exceptions/parameter-validation/FileTypeInvalidException';
import GetUploadedFileFromRequestService from '@services/parameter-validation/GetUploadedFileFromRequestService';
import {Request} from 'express';

describe('GetUploadedFileFromRequestService', () => {
  const getUploadedFileFromRequestService = new GetUploadedFileFromRequestService();

  const buildFile = (overrides: Partial<Express.Multer.File>): Express.Multer.File =>
    ({
      originalname: 'song.pdf',
      mimetype: 'application/pdf',
      size: 100,
      buffer: Buffer.from('content'),
      ...overrides,
    }) as Express.Multer.File;

  describe('handle', () => {
    describe('when no file is present on the request', () => {
      test('it throws FileMissingException', () => {
        const req = {file: undefined} as Request;

        expect(() => getUploadedFileFromRequestService.handle(req)).toThrow(FileMissingException);
      });
    });

    describe('when the uploaded file is empty', () => {
      test('it throws FileMissingException', () => {
        const req = {file: buildFile({size: 0})} as Request;

        expect(() => getUploadedFileFromRequestService.handle(req)).toThrow(FileMissingException);
      });
    });

    describe('when the file type is not supported', () => {
      test('it throws FileTypeInvalidException', () => {
        const req = {
          file: buildFile({originalname: 'song.png', mimetype: 'image/png'}),
        } as Request;

        expect(() => getUploadedFileFromRequestService.handle(req)).toThrow(FileTypeInvalidException);
      });
    });

    describe('when only the extension is recognised', () => {
      test('it handles', () => {
        const file = buildFile({originalname: 'song.docx', mimetype: 'application/octet-stream'});
        const req = {file} as Request;

        expect(getUploadedFileFromRequestService.handle(req)).toStrictEqual(file);
      });
    });

    test('it handles', () => {
      const file = buildFile({});
      const req = {file} as Request;

      expect(getUploadedFileFromRequestService.handle(req)).toStrictEqual(file);
    });
  });
});
