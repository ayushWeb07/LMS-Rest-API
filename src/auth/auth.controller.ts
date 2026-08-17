import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RegisterAuthDto } from './dtos/register-auth.dto';
import { LoginAuthDto } from './dtos/login-auth.dto';

/** This is the Auth controller */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async registerAuth(@Body() registerAuthDto: RegisterAuthDto) {
    const user = await this.authService.registerAuth(registerAuthDto);

    return {
      message: 'User successfully registered',
      user,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginAuth(@Body() loginAuthDto: LoginAuthDto) {
    const user = await this.authService.loginAuth(loginAuthDto);

    return {
      message: 'User successfully logged in',
      user,
    };
  }
}
