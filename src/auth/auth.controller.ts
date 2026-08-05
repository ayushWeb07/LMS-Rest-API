import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
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
  findAll(
    @Query('minPrice') minPrice: number,
    @Query('category') category: string,
  ) {
    return this.authService.findAll(minPrice, category);
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }
}
