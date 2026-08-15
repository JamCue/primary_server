// eslint-disable-next-line import/order
import {describe} from 'node:test';

import LogApiErrorService from '@services/LogApiErrorService';
import {bold, red as error} from 'cli-color';
import {Request} from 'express';

import mockReturnValue from '../utils/mockReturnValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('LogApiErrorService', () => {
  const originalUrl = 'originalUrl';
  const e = new Error();
  const req = {originalUrl} as Request;

  const logApiErrorService = new LogApiErrorService();

  describe('handle', () => {
    test('it handles', () => {
      console.error = mockReturnValue();

      expect(logApiErrorService.handle(e, req)).toBeUndefined();

      expect(jest.spyOn(console, 'error')).toBeCalledTimes(4);
      expect(jest.spyOn(console, 'error')).toHaveBeenNthCalledWith(1, `[❗] ${error('ERROR')} [❗] \n`);
      expect(jest.spyOn(console, 'error')).toHaveBeenNthCalledWith(3, e);
      expect(jest.spyOn(console, 'error')).toHaveBeenNthCalledWith(4, `\n ${bold(req.originalUrl)} \n`);
    });
  });
});
