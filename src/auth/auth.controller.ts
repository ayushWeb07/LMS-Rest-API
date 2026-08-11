import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { FindAllDto, FindOneDto } from '../users/users.dto';

/** This is the Auth controller */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('create')
  create() {
    return this.authService.create();
  }

  @Get('findAll')
  findAll(@Query() findAllDto: FindAllDto) {
    return this.authService.findAll(findAllDto);
  }

  @Get('findOne/:id')
  findOne(@Param() findOneDto: FindOneDto) {
    return this.authService.findOne(findOneDto);
  }
}
