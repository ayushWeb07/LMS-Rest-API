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
  async registerAuth(@Body() registerDto: RegisterAuthDto) {
    const user = await this.authService.registerAuth(registerDto);

    return {
      message: 'User successfully registered',
      user,
    };
  }

  @Post('login')
  loginAuth(@Body() loginDto: LoginAuthDto) {
    return this.authService.loginAuth(loginDto);
  }
}
