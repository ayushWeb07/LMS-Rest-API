import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RegisterAuthDto } from './dtos/register-auth.dto';
import { LoginAuthDto } from './dtos/login-auth.dto';
import { AccessTokenGuard } from './guards/access-token/access-token.guard';
import type { Request } from 'express';

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
    const token = await this.authService.loginAuth(loginAuthDto);

    return {
      message: 'User successfully logged in',
      token,
    };
  }

  @UseGuards(AccessTokenGuard)
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
