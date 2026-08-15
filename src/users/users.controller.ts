import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FindAllDto, FindOneDto } from './users.dto';
import { ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUserByIdDto } from './dtos/find-user-by-id.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { DeleteUserDto } from './dtos/delete-user.dto';

/** This is the Users controller */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);

    return {
      message: 'User successfully created',
      user,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllUsers() {
    const users = await this.usersService.findAllUsers();

    return {
      message: 'All the users were successfully fetched',
      users,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findUserById(@Param() findUserByIdDto: FindUserByIdDto) {
    const user = await this.usersService.findUserById(findUserByIdDto);

    return {
      message: 'User successfully fetched',
      user,
    };
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  async patchUser(@Body() patchUserDto: PatchUserDto) {
    // update it
    await this.usersService.patchUser(patchUserDto);

    return {
      message: `User with id '${patchUserDto.id}' got successfully updated`,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param() deleteUserDto: DeleteUserDto) {
    // delete it
    await this.usersService.deleteUser(deleteUserDto);

    return {
      message: `User with id '${deleteUserDto.id}' got successfully deleted`,
    };
  }

  @Post('keys')
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
