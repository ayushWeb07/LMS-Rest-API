import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../config/database_config.interface';
import { ServerConfig } from '../config/server_config.interface';
import { FindAllDto, FindOneDto } from './users.dto';
import { PostsService } from '../posts/posts.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

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
