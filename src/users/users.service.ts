import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../config/database_config.interface';
import { ServerConfig } from '../config/server_config.interface';
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

/** This is the Users service */
@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,

    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
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

  async findUserById(findUserByIdDto: FindUserByIdDto): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: {
        id: findUserByIdDto.id,
      },
    });

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
    // delete the user
    await this.usersRepository.softDelete({
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
