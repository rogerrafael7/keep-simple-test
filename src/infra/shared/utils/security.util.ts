import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

export type JwtPayload = {
  id: number;
  name: string;
};

export class SecurityUtil {
  static readonly saltRounds = 10;
  static readonly keyLength = 64;
  static readonly digest = 'sha512';

  static async hashPassword(password: string): Promise<string> {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
      .pbkdf2Sync(
        password,
        salt,
        SecurityUtil.saltRounds,
        SecurityUtil.keyLength,
        SecurityUtil.digest,
      )
      .toString('hex');
    return `${salt}:${hash}`;
  }

  static async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    const [salt, originalHash] = hash.split(':');
    const hashToCompare = crypto
      .pbkdf2Sync(
        password,
        salt,
        SecurityUtil.saltRounds,
        SecurityUtil.keyLength,
        SecurityUtil.digest,
      )
      .toString('hex');
    return originalHash === hashToCompare;
  }

  static generateJwtToken(user: JwtPayload, expiresIn: string = '1d'): string {
    return jwt.sign(
      {
        id: user.id,
        name: user.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn,
      },
    );
  }

  static obfuscate(
    input: string | number,
    start: number = 3,
    end: number = 2,
  ): string {
    const value = input.toString();
    const sanitizedTaxId = value.replace(/\D/g, '');

    const length = sanitizedTaxId.length;

    if (start + end >= length) {
      throw new Error(
        'Invalid parameters: visible start and end cannot exceed total length',
      );
    }

    const startVisible = sanitizedTaxId.slice(0, start);
    const endVisible = sanitizedTaxId.slice(-end);
    const obfuscatedMiddle = '*'.repeat(length - (start + end));

    return `${startVisible}${obfuscatedMiddle}${endVisible}`;
  }
}
