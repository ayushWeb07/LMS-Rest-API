import { Controller, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('create')
  create() {
    return this.usersService.create();
  }

  @Get('findAll')
  findAll(
    @Query('minPrice') minPrice: number,
    @Query('category') category: string,
  ) {
    return this.usersService.findAll(minPrice, category);
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
