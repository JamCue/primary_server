import CreateUserRequestServiceDto from '@dtos/CreateUserRequestServiceDto';
import CreateUserDtoMapper from '@mappers/CreateUserDtoMapper';
import GetFirebaseRefIdFromRequestService from '@services/parameter-validation/GetFirebaseRefIdFromRequestService';
import GetRequestBodyService from '@services/parameter-validation/GetRequestBodyService';
import GetUserEmailFromBodyService from '@services/parameter-validation/GetUserEmailFromBodyService';
import GetUserNameFromBodyService from '@services/parameter-validation/GetUserNameFromBodyService';
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

  const getRequestBodyService = new GetRequestBodyService();
  const getUserNameFromBodyService = new GetUserNameFromBodyService();
  const getUserEmailFromBodyService = new GetUserEmailFromBodyService();
  const getFirebaseRefIdFromRequestService = new GetFirebaseRefIdFromRequestService();
  const mapper = new CreateUserDtoMapper();
  const createUserRequestService = new CreateUserRequestService(
    getRequestBodyService,
    getUserNameFromBodyService,
    getUserEmailFromBodyService,
    getFirebaseRefIdFromRequestService,
    mapper
  );

  describe('handle', () => {
    test('it handles', async () => {
      getRequestBodyService.handle = mockReturnValue(req.body);
      getUserNameFromBodyService.handle = mockReturnValue(name);
      getUserEmailFromBodyService.handle = mockReturnValue(email);
      getFirebaseRefIdFromRequestService.handle = mockReturnValue(firebaseRefId);
      mapper.map = mockReturnValue(dto);

      await expect(createUserRequestService.handle(req)).resolves.toStrictEqual(dto);
      expect(jest.spyOn(getRequestBodyService, 'handle')).toHaveBeenCalledWith(req);
      expect(jest.spyOn(getUserNameFromBodyService, 'handle')).toHaveBeenCalledWith(req);
      expect(jest.spyOn(getUserEmailFromBodyService, 'handle')).toHaveBeenCalledWith(req);
      expect(jest.spyOn(getFirebaseRefIdFromRequestService, 'handle')).toHaveBeenCalledWith(req);
      expect(jest.spyOn(mapper, 'map')).toHaveBeenCalledWith({name, email, firebaseRefId});
    });
  });
});
