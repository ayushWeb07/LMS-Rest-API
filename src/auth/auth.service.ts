import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  register() {
    return {
      status: 'ok',
      message: 'Register auth endpoint',
    };
  }

  login() {
    return {
      status: 'ok',
      message: 'Login auth endpoint',
    };
  }
}
