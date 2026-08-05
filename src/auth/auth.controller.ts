import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('register')
  register() {
    return this.authService.register();
  }

  @Get('login')
  login() {
    return this.authService.login();
  }

  @Get('create')
  create() {
    return this.authService.create();
  }

  @Get('findAll')
  findAll() {
    return this.authService.findAll();
  }

  @Get('findOne')
  findOne() {
    return this.authService.findOne();
  }
}
