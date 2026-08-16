import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { LoginDto, RegisterDto } from '../auth.dto';
import { FindAllDto, FindOneDto } from '../../users/users.dto';

/** This is the Auth service */
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

  login(loginDto: LoginDto) {
    return {
      status: 'ok',
      message: 'Login auth endpoint',
      payload: loginDto,
    };
  }

  create() {
    return this.usersService.create();
  }

  findAll(findAllDto: FindAllDto) {
    return this.usersService.findAll(findAllDto);
  }

  findOne(findOneDto: FindOneDto) {
    return this.usersService.findOne(findOneDto);
  }
}
