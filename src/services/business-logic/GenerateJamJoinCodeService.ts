import {randomBytes} from 'crypto';

// Excludes visually ambiguous characters (0/O, 1/I/L) so a musician can
// read a code off a screen or printout without misreading it.
const JOIN_CODE_ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
const JOIN_CODE_LENGTH = 6;

class GenerateJamJoinCodeService {
  public handle(): string {
    const bytes = randomBytes(JOIN_CODE_LENGTH);
    let code = '';

    for (let i = 0; i < JOIN_CODE_LENGTH; i++) {
      code += JOIN_CODE_ALPHABET[bytes[i] % JOIN_CODE_ALPHABET.length];
    }

    return code;
  }
}

export default GenerateJamJoinCodeService;
