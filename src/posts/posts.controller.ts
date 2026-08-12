import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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
  @HttpCode(HttpStatus.CREATED)
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
  async createPost(@Body() createPostDto: CreatePostDto) {
    const post = await this.postsService.createPost(createPostDto);
    return {
      message: 'Post successfully created',
      post,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllPosts() {
    const posts = await this.postsService.findAllPosts();
    return {
      message: 'All the posts successfully fetched',
      posts,
    };
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
