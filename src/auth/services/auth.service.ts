import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { RegisterAuthDto } from '../dtos/register-auth.dto';
import { LoginAuthDto } from '../dtos/login-auth.dto';
import { HashingService } from './hashing.service';
import { User } from '../../users/user.entity';

/** This is the Auth service */
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
  ) {}

  async registerAuth(registerDto: RegisterAuthDto): Promise<User> {
    // hash the password
    const passwordHash = await this.hashingService.hashPassword(
      registerDto.password,
    );

    registerDto.password = passwordHash;

    // call the users service
    const user = await this.usersService.createUser(registerDto);
    return user;
  }

  loginAuth(loginDto: LoginAuthDto) {
    return {
      status: 'ok',
      message: 'Login auth endpoint',
      payload: loginDto,
    };
  }
}
