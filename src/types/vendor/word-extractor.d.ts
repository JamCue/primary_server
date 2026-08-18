declare module 'word-extractor' {
  class Document {
    getBody(): string;
    getFootnotes(): string;
    getEndnotes(): string;
    getHeaders(options?: {includeFooters?: boolean}): string;
    getTextboxes(options?: {includeHeadersAndFooters?: boolean}): string;
  }

  class WordExtractor {
    extract(input: string | Buffer): Promise<Document>;
  }

  export = WordExtractor;
}
