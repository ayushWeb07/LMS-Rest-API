import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FindAllDto, FindOneDto } from './users.dto';
import { ApiOperation } from '@nestjs/swagger';

/** This is the Users controller */
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
  @ApiOperation({
    summary: 'This endpoint fetches all the users',
  })
  findAll(@Query() findAllDto: FindAllDto) {
    return this.usersService.findAll(findAllDto);
  }

  @Get('findOne/:id')
  @ApiOperation({
    summary: 'This endpoint fetches the users by id',
  })
  findOne(@Param() findOneDto: FindOneDto) {
    return this.usersService.findOne(findOneDto);
  }
}
