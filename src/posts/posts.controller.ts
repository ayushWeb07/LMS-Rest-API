import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { PatchPostDto } from './dtos/patch-post.dto';

/** This is the Posts controller */
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /** Find posts of one user */
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

  @Patch()
  @ApiOperation({
    description: 'This endpoint updates an existing post',
  })
  @ApiResponse({
    status: 200,
    description: 'The existing post has been successfully updated.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data provided.',
  })
  patchPost(@Body() patchPostDto: PatchPostDto) {
    return this.postsService.patchPost(patchPostDto);
  }
}
