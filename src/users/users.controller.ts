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
import { UsersService } from './services/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUserByIdDto } from './dtos/find-user-by-id.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { DeleteUserDto } from './dtos/delete-user.dto';
import { BulkCreateUsersDto } from './dtos/bulk-create-users.dto';
import { FindUsersDto } from './dtos/find-users.dto';
import { IsPublic } from '../auth/decorators/skip-access-token.decorator';

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

  @Post('bulk')
  @HttpCode(HttpStatus.CREATED)
  async bulkCreateUsers(@Body() bulkCreateUsersDto: BulkCreateUsersDto) {
    const users = await this.usersService.bulkCreateUsers(bulkCreateUsersDto);

    return {
      message: 'Users successfully bulk created',
      users,
    };
  }

  @IsPublic()
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllUsers(@Query() findUsersDto: FindUsersDto) {
    const users = await this.usersService.findAllUsers(findUsersDto);

    return {
      message: 'All the users were successfully fetched',
      users,
    };
  }

  @IsPublic()
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
}
