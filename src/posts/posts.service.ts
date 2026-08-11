import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  findPosts(userId: string): string {
    if (this.usersService.findOneForPost(userId))
      return `Finding all posts of ${userId}`;

    return `Such user does not exist`;
  }

  findAllPostsOfUser(): string {
    return `Fetching the posts`;
  }

  createPost(createPostDto: CreatePostDto) {
    return {
      message: 'Created the post',
      createPostDto,
    };
  }

  patchPost(patchPostDto: PatchPostDto) {
    return {
      message: 'Updated the post',
      patchPostDto,
    };
  }
}
