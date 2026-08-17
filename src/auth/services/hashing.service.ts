import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingService {
  abstract hashPassword(inputPassword: string): Promise<string>;

  abstract comparePasswords(
    inputPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
