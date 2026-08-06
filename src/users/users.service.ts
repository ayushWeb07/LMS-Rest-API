import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../config/database_config.interface';
import { ServerConfig } from '../config/server_config.interface';

@Injectable()
export class UsersService {
  constructor(private readonly configService: ConfigService) {}

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

  findOne(id: number) {
    return {
      status: 'ok',
      message: `users - findOne - ${id}`,
    };
  }
}
