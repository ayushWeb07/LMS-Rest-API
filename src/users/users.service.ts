import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../config/interfaces/database_config.interface';
import { ServerConfig } from '../config/interfaces/server_config.interface';
import { FindAllDto, FindOneDto } from './users.dto';
import { PostsService } from '../posts/posts.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUserByIdDto } from './dtos/find-user-by-id.dto';
import { DeleteUserDto } from './dtos/delete-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { FindUserByEmailAndUsernameDto } from './dtos/find-user-by-email-and-username.dto';
import { UserConflictEnum } from './enums/user-conflict.enum';
import { BulkCreateUsersDto } from './dtos/bulk-create-users.dto';
import { BulkCreateUsersService } from './bulk-create-users.service';

/** This is the Users service */
@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,

    private readonly bulkCreateUsersService: BulkCreateUsersService,

    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async bulkCreateUsers(
    bulkCreateUsersDto: BulkCreateUsersDto,
  ): Promise<User[]> {
    const users =
      await this.bulkCreateUsersService.bulkCreateUsers(bulkCreateUsersDto);

    return users;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // find the user by email and username
    const existingUser = await this.usersRepository.findOne({
      where: [
        {
          email: createUserDto.email,
        },
        {
          username: createUserDto.username,
        },
      ],
    });

    if (existingUser) {
      if (
        existingUser.email === createUserDto.email &&
        existingUser.username === createUserDto.username
      ) {
        throw new BadRequestException(
          `User with such email and username already exists`,
        );
      } else if (existingUser.email === createUserDto.email) {
        throw new BadRequestException(
          `Email '${createUserDto.email}' already in use`,
        );
      } else {
        throw new BadRequestException(
          `Username '${createUserDto.username}' already taken`,
        );
      }
    }

    // create a new user and save it
    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);
    return newUser;
  }

  async findAllUsers(): Promise<User[]> {
    // find all the users
    const users = await this.usersRepository.find();
    return users;
  }

  async findUserById(findUserByIdDto: FindUserByIdDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id: findUserByIdDto.id,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `User with id '${findUserByIdDto.id}' does not exist`,
      );
    }

    return user;
  }

  async findUserByEmailAndUsername(
    findUserByEmailAndUsernameDto: FindUserByEmailAndUsernameDto,
  ): Promise<UserConflictEnum> {
    const user = await this.usersRepository.findOne({
      where: {
        email: findUserByEmailAndUsernameDto.email,
        username: findUserByEmailAndUsernameDto.username,
      },
    });

    if (user) {
      if (
        user.email === findUserByEmailAndUsernameDto.email &&
        user.username === findUserByEmailAndUsernameDto.username
      ) {
        return UserConflictEnum.BOTH_TAKEN;
      } else if (user.email === findUserByEmailAndUsernameDto.email) {
        return UserConflictEnum.EMAIL_EXISTS;
      } else {
        return UserConflictEnum.USERNAME_TAKEN;
      }
    }

    return UserConflictEnum.NO_USER;
  }

  async patchUser(patchUserDto: PatchUserDto): Promise<void> {
    // find the user by id
    const user = await this.usersRepository.findOne({
      where: {
        id: patchUserDto.id,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `User with id '${patchUserDto.id}' does not exist`,
      );
    }

    // check if email got updated
    if (patchUserDto.email) {
      // check if this email already exists
      const existingUser = await this.usersRepository.findOne({
        where: {
          email: patchUserDto.email,
        },
      });

      if (existingUser) {
        throw new BadRequestException(
          `Email '${patchUserDto.email}' already in use`,
        );
      }
    }

    // check if username got updated
    if (patchUserDto.username) {
      // check if this username already exists
      const existingUser = await this.usersRepository.findOne({
        where: {
          username: patchUserDto.username,
        },
      });

      if (existingUser) {
        throw new BadRequestException(
          `Username '${patchUserDto.username}' already taken`,
        );
      }
    }

    // update it
    await this.usersRepository.update(
      {
        id: patchUserDto.id,
      },
      {
        ...patchUserDto,
      },
    );
  }

  async deleteUser(deleteUserDto: DeleteUserDto): Promise<void> {
    // find the user by id
    const user = await this.usersRepository.findOne({
      where: {
        id: deleteUserDto.id,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `User with id '${deleteUserDto.id}' does not exist`,
      );
    }

    // delete the user
    await this.usersRepository.delete({
      id: deleteUserDto.id,
    });
  }

  getKeys() {
    // create the database config
    const databaseConfig = this.configService.get<DatabaseConfig>('database');

    // create the server config
    const serverConfig = this.configService.get<ServerConfig>('server');

    return {
      status: 'ok',
      message: 'users - get keys',
      databaseConfig,
      serverConfig,
    };
  }

  create() {
    return {
      status: 'ok',
      message: 'users - create',
    };
  }

  findAll(findAllDto: FindAllDto) {
    return {
      status: 'ok',
      message: 'users - findAll',
      findAllDto,
    };
  }

  findOneForPost(userId: string): boolean {
    return userId.length > 5;
  }

  findOne(findOneDto: FindOneDto) {
    return {
      status: 'ok',
      message: `users - findOne - ${findOneDto.id}`,
    };
  }

  findAllPostsOfUser() {
    return this.postsService.findAllPostsOfUser();
  }
}
