import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { RegisterAuthDto } from '../dtos/register-auth.dto';
import { LoginAuthDto } from '../dtos/login-auth.dto';

/** This is the Auth service */
@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  register(registerDto: RegisterAuthDto) {
    return {
      status: 'ok',
      message: 'Register auth endpoint',
      payload: registerDto,
    };
  }

  login(loginDto: LoginAuthDto) {
    return {
      status: 'ok',
      message: 'Login auth endpoint',
      payload: loginDto,
    };
  }
}
