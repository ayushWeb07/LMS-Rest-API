import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FindOneDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('keys')
  getKeys() {
    return this.usersService.getKeys();
  }

  @Get('create')
  create() {
    return this.usersService.create();
  }

  @Get('findAll')
  findAll(
    @Query('minPrice', new DefaultValuePipe(0), ParseIntPipe) minPrice: number,
    @Query('category', new DefaultValuePipe('all')) category: string,
  ) {
    return this.usersService.findAll(minPrice, category);
  }

  @Get('findOne/:id')
  findOne(@Param() findOneDto: FindOneDto) {
    return this.usersService.findOne(findOneDto);
  }
}
