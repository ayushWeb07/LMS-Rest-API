import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

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

  create() {
    return this.usersService.create();
  }

  findAll() {
    return this.usersService.findAll();
  }

  findOne() {
    return this.usersService.findOne();
  }
}
