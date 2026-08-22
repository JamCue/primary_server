import JamAudienceAccessEnum from '@enums/JamAudienceAccessEnum';
import JamJoinOptionEnum from '@enums/JamJoinOptionEnum';
import JamSessionTypeEnum from '@enums/JamSessionTypeEnum';
import DbException from '@exceptions/inner/DbException';
import SaveJamServiceException from '@exceptions/inner/SaveJamServiceException';
import JamRepository from '@repositories/JamRepository';
import SaveJamService from '@services/business-logic/SaveJamService';
import CreateJamPayloadType from '@t/CreateJamPayloadType';
import JamType from '@t/JamType';

import mockImplementation from '../../utils/mockImplementation';
import mockResolvedValue from '../../utils/mockResolvedValue';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('SaveJamService', () => {
  const payload: CreateJamPayloadType = {
    musicianId: 'musicianId',
    title: 'Friday Night Jam',
    songs: [{songId: 'songId1', title: 'Tum Se Hi', artist: 'Mohit Chauhan', key: 'C', capo: 1}],
    scheduledAt: new Date('2026-05-17T19:30:00.000Z'),
    sessionType: JamSessionTypeEnum.OPEN,
    audienceAccess: JamAudienceAccessEnum.ANYONE_CAN_REQUEST,
    joinOption: JamJoinOptionEnum.QR_AND_LINK,
    strummingDisplay: true,
    showChords: true,
    capoDisplay: true,
    requestLimit: 3,
    autoAdvance: false,
    joinCode: 'AB12CD',
  };
  const jam = {id: 'id', ...payload, createdAt: new Date(), updatedAt: new Date()} as JamType;

  const jamRepository = new JamRepository();
  const saveJamService = new SaveJamService(jamRepository);

  describe('handle', () => {
    describe('when jamRepository fails', () => {
      test('it throws SaveJamServiceException', async () => {
        jamRepository.save = mockImplementation(() => {
          throw new DbException(new Error());
        });

        await expect(saveJamService.handle(payload)).rejects.toBeInstanceOf(SaveJamServiceException);
      });
    });

    test('it handles', async () => {
      jamRepository.save = mockResolvedValue(jam);

      await expect(saveJamService.handle(payload)).resolves.toStrictEqual(jam);
      expect(jest.spyOn(jamRepository, 'save')).toHaveBeenCalledWith(payload);
    });
  });
});
