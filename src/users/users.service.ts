import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(private readonly configService: ConfigService) {}

  getKeys() {
    const port = this.configService.get<string>('PORT');
    const dbUser = this.configService.get<string>('DATABASE_USER');
    const dbPort = this.configService.get<string>('DATABASE_PORT');

    return {
      status: 'ok',
      message: 'users - create',
      port,
      dbUser,
      dbPort,
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
