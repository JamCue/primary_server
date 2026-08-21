import CreateUserRequestServiceDto from '@dtos/CreateUserRequestServiceDto';
import CreateUserDtoMapper from '@mappers/CreateUserDtoMapper';
import GetFirebaseRefIdFromRequestService from '@services/parameter-validation/GetFirebaseRefIdFromRequestService';
import GetValidatedRequestBodyService from '@services/parameter-validation/GetValidatedRequestBodyService';
import CreateUserRequestService from '@services/request-services/CreateUserRequestService';
import {Request} from 'express';

import mockReturnValue from '../../utils/mockReturnValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('CreateUserRequestService', () => {
  const name = 'name';
  const email = 'user@example.com';
  const firebaseRefId = 'firebaseRefId';
  const req = {body: {name, email}, firebaseUserId: firebaseRefId} as Request;
  const dto = Object.assign(new CreateUserRequestServiceDto(), {name, email, firebaseRefId});

  const getValidatedRequestBodyService = new GetValidatedRequestBodyService();
  const getFirebaseRefIdFromRequestService = new GetFirebaseRefIdFromRequestService();
  const mapper = new CreateUserDtoMapper();
  const createUserRequestService = new CreateUserRequestService(
    getValidatedRequestBodyService,
    getFirebaseRefIdFromRequestService,
    mapper
  );

  describe('handle', () => {
    test('it handles', async () => {
      getValidatedRequestBodyService.handle = mockReturnValue({name, email});
      getFirebaseRefIdFromRequestService.handle = mockReturnValue(firebaseRefId);
      mapper.map = mockReturnValue(dto);

      await expect(createUserRequestService.handle(req)).resolves.toStrictEqual(dto);
      expect(jest.spyOn(getValidatedRequestBodyService, 'handle')).toHaveBeenCalledWith(req, expect.anything());
      expect(jest.spyOn(getFirebaseRefIdFromRequestService, 'handle')).toHaveBeenCalledWith(req);
      expect(jest.spyOn(mapper, 'map')).toHaveBeenCalledWith({name, email, firebaseRefId});
    });
  });
});
