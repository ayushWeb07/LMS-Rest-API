import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(private readonly usersService: UsersService) {}

  findPosts(userId: string): string {
    if (this.usersService.findOneForPost(userId))
      return `Finding all posts of ${userId}`;

    return `Such user does not exist`;
  }
}
