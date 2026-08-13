import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
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
import { UserConflictEnum } from './enums/user-conflict.enum';

/** This is the Users controller */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    // find the user
    const checkUserConflict =
      await this.usersService.findUserByEmailAndUsername({
        email: createUserDto.email,
        username: createUserDto.username,
      });

    // email and username both taken
    if (checkUserConflict === UserConflictEnum.BOTH_TAKEN) {
      throw new HttpException(
        'User with such email and username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    // email exists
    if (checkUserConflict === UserConflictEnum.EMAIL_EXISTS) {
      throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
    }

    // username taken
    if (checkUserConflict === UserConflictEnum.USERNAME_TAKEN) {
      throw new HttpException('Username already taken', HttpStatus.BAD_REQUEST);
    }

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

    if (!user) {
      throw new HttpException(
        'Such user does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      message: 'User successfully fetched',
      user,
    };
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  async patchUser(@Body() patchUserDto: PatchUserDto) {
    // find the user by id
    const user = await this.usersService.findUserById({
      id: patchUserDto.id,
    });

    if (!user) {
      throw new HttpException(
        'Such user does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    // update it
    await this.usersService.patchUser(patchUserDto);

    return {
      message: 'User successfully updated',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param() deleteUserDto: DeleteUserDto) {
    // find the user by id
    const user = await this.usersService.findUserById({
      id: deleteUserDto.id,
    });

    if (!user) {
      throw new HttpException(
        'Such user does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    // delete it
    await this.usersService.deleteUser(deleteUserDto);

    return {
      message: 'User successfully deleted',
    };
  }

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
