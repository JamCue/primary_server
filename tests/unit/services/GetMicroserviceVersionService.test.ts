import {afterEach} from 'node:test';

import GetMicroserviceVersionService from '@services/GetMicroserviceVersionService';
import HttpResponseOk from '@value-objects/HttpResponseOk';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('GetMicroserviceVersionService', () => {
  const version = 'xxxxxxx';

  const getMicroserviceVersionService = new GetMicroserviceVersionService();

  describe('handle', () => {
    test('it works', async () => {
      await expect(getMicroserviceVersionService.handle(version)).resolves.toStrictEqual(new HttpResponseOk(version));
    });
  });
});
