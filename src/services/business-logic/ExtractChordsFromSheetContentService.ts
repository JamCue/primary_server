/**
 * A line is treated as a "chord line" (as opposed to a lyric line) when
 * every whitespace-separated token on it looks like a chord — the same
 * heuristic most chord-sheet parsers use, since chord sheets place chords
 * on their own line, positioned above the lyric they apply to.
 */
class ExtractChordsFromSheetContentService {
  private static readonly CHORD_TOKEN_PATTERN = /^[A-G](#|b)?(maj|min|dim|aug|sus|add|m|M)?[0-9]{0,2}(\/[A-G](#|b)?)?$/;

  public handle(sheetContent: string): string[] {
    const chords: string[] = [];

    for (const line of sheetContent.split('\n')) {
      const tokens = line
        .trim()
        .split(/\s+/)
        .filter(token => token.length > 0);

      if (tokens.length === 0 || !tokens.every(token => ExtractChordsFromSheetContentService.isChord(token))) {
        continue;
      }

      chords.push(...tokens);
    }

    return [...new Set(chords)];
  }

  private static isChord(token: string): boolean {
    return ExtractChordsFromSheetContentService.CHORD_TOKEN_PATTERN.test(token);
  }
}

export default ExtractChordsFromSheetContentService;
