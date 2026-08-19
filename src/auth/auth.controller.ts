import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RegisterAuthDto } from './dtos/register-auth.dto';
import { LoginAuthDto } from './dtos/login-auth.dto';
import { SetAuthType } from './decorators/set-auth-type.decorator';
import { AuthType } from './enums/auth-type.enum';
import { AuthenticatedUser } from './decorators/authenticated-user.decorator';
import { IGenerateTokensResponse } from './interfaces/generate-tokens-response.interface';

/** This is the Auth controller */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SetAuthType(AuthType.NONE)
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async registerAuth(@Body() registerAuthDto: RegisterAuthDto) {
    const user = await this.authService.registerAuth(registerAuthDto);

    return {
      message: 'User successfully registered',
      user,
    };
  }

  @SetAuthType(AuthType.NONE)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginAuth(@Body() loginAuthDto: LoginAuthDto) {
    const tokens: IGenerateTokensResponse =
      await this.authService.loginAuth(loginAuthDto);

    return {
      message: 'User successfully logged in',
      tokens,
    };
  }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(@AuthenticatedUser('userId') userId: number) {
    const user = await this.authService.getProfile(userId);

    return {
      message: 'Profile successfully fetched',
      user,
    };
  }
}
