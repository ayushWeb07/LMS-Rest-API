import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  create() {
    return {
      status: 'ok',
      message: 'users - create',
    };
  }

  findAll() {
    return {
      status: 'ok',
      message: 'users - findAll',
    };
  }

  findOne() {
    return {
      status: 'ok',
      message: 'users - findOne',
    };
  }
}
