import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { FindOneDto } from '../users/users.dto';

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
  findAll(
    @Query('minPrice', ParseIntPipe) minPrice: number,
    @Query('category') category: string,
  ) {
    return this.authService.findAll(minPrice, category);
  }

  @Get('findOne/:id')
  findOne(@Param() findOneDto: FindOneDto) {
    return this.authService.findOne(findOneDto);
  }
}
