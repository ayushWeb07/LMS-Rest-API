import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get(':userId')
  findPosts(@Param('userId') userId: string) {
    return {
      message: this.postsService.findPosts(userId),
    };
  }
}
