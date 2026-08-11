import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get(':userId')
  findPosts(@Param('userId') userId: string) {
    return {
      message: this.postsService.findPosts(userId),
    };
  }

  @Post()
  @ApiOperation({
    description: 'This endpoint creates a new post',
  })
  @ApiCreatedResponse({
    description: 'The new post has been successfully created.',
    type: CreatePostDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data provided.',
  })
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }
}
