import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../config/database_config.interface';
import { ServerConfig } from '../config/server_config.interface';
import { FindOneDto } from './users.dto';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,

    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,
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

  findAll(minPrice: number, category: string) {
    return {
      status: 'ok',
      message: 'users - findAll',
      minPrice,
      category,
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
