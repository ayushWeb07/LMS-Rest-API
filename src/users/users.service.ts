import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
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

  findOne(id: string) {
    return {
      status: 'ok',
      message: `users - findOne - ${id}`,
    };
  }
}
