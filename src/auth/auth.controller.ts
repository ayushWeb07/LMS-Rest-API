import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RegisterAuthDto } from './dtos/register-auth.dto';
import { LoginAuthDto } from './dtos/login-auth.dto';
import type { Request } from 'express';
import { SetAuthType } from './decorators/set-auth-type.decorator';
import { AuthType } from './enums/auth-type.enum';
import { AuthenticatedUser } from './decorators/authenticated-user.decorator';

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

  @SetAuthType(AuthType.NONE)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginAuth(@Body() loginAuthDto: LoginAuthDto) {
    const token = await this.authService.loginAuth(loginAuthDto);

    return {
      message: 'User successfully logged in',
      token,
    };
  }

  @Get('my-email')
  @HttpCode(HttpStatus.OK)
  getMyName(@AuthenticatedUser('userEmail') userEmail: string) {
    return {
      message: 'User email successfully fetched',
      userEmail,
    };
  }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req: Request) {
    const userId = req.userId;

    if (!userId) {
      throw new UnauthorizedException(
        'Access denied: please login again to view your profile',
      );
    }

    const user = await this.authService.getProfile({
      id: userId,
    });

    return {
      message: 'Profile successfully fetched',
      user,
    };
  }
}
