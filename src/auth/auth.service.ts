import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  register(registerDto: RegisterDto) {
    return {
      status: 'ok',
      message: 'Register auth endpoint',
      payload: registerDto,
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

  findAll(minPrice: number, category: string) {
    return this.usersService.findAll(minPrice, category);
  }

  findOne(id: number) {
    return this.usersService.findOne(id);
  }
}
