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
import { FindUserByIdDto } from './dtos/find-user-by-id.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { BulkCreateUsersDto } from './dtos/bulk-create-users.dto';
import { FindUsersDto } from './dtos/find-users.dto';
import { SetAuthType } from '../auth/decorators/set-auth-type.decorator';
import { AuthType } from '../auth/enums/auth-type.enum';
import { AuthenticatedUser } from '../auth/decorators/authenticated-user.decorator';

/** This is the Users controller */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('bulk')
  @HttpCode(HttpStatus.CREATED)
  async bulkCreateUsers(@Body() bulkCreateUsersDto: BulkCreateUsersDto) {
    const users = await this.usersService.bulkCreateUsers(bulkCreateUsersDto);

    return {
      message: 'Users successfully bulk created',
      users,
    };
  }

  @SetAuthType(AuthType.NONE)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllUsers(@Query() findUsersDto: FindUsersDto) {
    const users = await this.usersService.findAllUsers(findUsersDto);

    return {
      message: 'All the users were successfully fetched',
      users,
    };
  }

  @SetAuthType(AuthType.NONE)
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
  async patchUser(
    @Body() patchUserDto: PatchUserDto,
    @AuthenticatedUser('userId') userId: number,
  ) {
    // update it
    await this.usersService.patchUser(patchUserDto, userId);

    return {
      message: `User with id '${userId}' got successfully updated`,
    };
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteUser(@AuthenticatedUser('userId') userId: number) {
    // delete it
    await this.usersService.deleteUser(userId);

    return {
      message: `User with id '${userId}' got successfully deleted`,
    };
  }
}
