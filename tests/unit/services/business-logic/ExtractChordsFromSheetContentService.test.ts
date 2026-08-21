import ExtractChordsFromSheetContentService from '@services/business-logic/ExtractChordsFromSheetContentService';

describe('ExtractChordsFromSheetContentService', () => {
  const extractChordsFromSheetContentService = new ExtractChordsFromSheetContentService();

  describe('handle', () => {
    test('it extracts chords from chord lines, deduplicated and in order of first appearance', () => {
      const sheetContent =
        'Eb              Fm     Bb\n' +
        'Offo! Isey.. isey daant ke bhagaaun\n' +
        '\n' +
        'Eb         Bb\n' +
        'Offo! Ya.. ya seene se lagaaun';

      expect(extractChordsFromSheetContentService.handle(sheetContent)).toStrictEqual(['Eb', 'Fm', 'Bb']);
    });

    test('it recognises accidentals, minor/quality suffixes, extensions and slash chords', () => {
      const sheetContent = 'G   Em   D7   G#m7   Csus4/G   D/F#';

      expect(extractChordsFromSheetContentService.handle(sheetContent)).toStrictEqual([
        'G',
        'Em',
        'D7',
        'G#m7',
        'Csus4/G',
        'D/F#',
      ]);
    });

    describe('when a chord line is immediately followed by a lyric line', () => {
      test('it extracts only the chord line, ignoring the lyrics', () => {
        const sheetContent = 'G Em D\nI found a love for me';

        expect(extractChordsFromSheetContentService.handle(sheetContent)).toStrictEqual(['G', 'Em', 'D']);
      });
    });

    describe('when there are no chord lines', () => {
      test('it returns an empty array', () => {
        const sheetContent = 'Just some plain lyrics\nwith no chords above them';

        expect(extractChordsFromSheetContentService.handle(sheetContent)).toStrictEqual([]);
      });
    });

    describe('when the sheet content is blank', () => {
      test('it returns an empty array', () => {
        expect(extractChordsFromSheetContentService.handle('   \n  \n')).toStrictEqual([]);
      });
    });
  });
});
