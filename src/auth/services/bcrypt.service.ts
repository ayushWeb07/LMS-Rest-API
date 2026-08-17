import { HashingService } from './hashing.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService implements HashingService {
  async hashPassword(inputPassword: string): Promise<string> {
    const hash = await bcrypt.hash(inputPassword, 10);

    return hash;
  }

  async comparePasswords(
    inputPassword: string,
    passwordHash: string,
  ): Promise<boolean> {
    const isPasswordsMatch = await bcrypt.compare(inputPassword, passwordHash);
    return isPasswordsMatch;
  }
}
