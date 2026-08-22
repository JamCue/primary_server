import GenerateJamJoinCodeService from '@services/business-logic/GenerateJamJoinCodeService';

describe('GenerateJamJoinCodeService', () => {
  const generateJamJoinCodeService = new GenerateJamJoinCodeService();

  describe('handle', () => {
    test('it returns a 6-character code drawn from the unambiguous alphabet', () => {
      const code = generateJamJoinCodeService.handle();

      expect(code).toMatch(/^[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{6}$/);
    });

    test('it returns a different code on each call', () => {
      const codes = new Set(Array.from({length: 20}, () => generateJamJoinCodeService.handle()));

      expect(codes.size).toBeGreaterThan(1);
    });
  });
});
