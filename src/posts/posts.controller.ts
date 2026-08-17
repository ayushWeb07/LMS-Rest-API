import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { PatchPostDto } from './dtos/patch-post.dto';
import { FindPostByIdDto } from './dtos/find-post-by-id.dto';
import { DeletePostDto } from './dtos/delete-post.dto';
import { FindPostsDto } from './dtos/find-posts.dto';

/** This is the Posts controller */
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

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
  async findAllPosts(@Query() findPostsDto: FindPostsDto) {
    const posts = await this.postsService.findAllPosts(findPostsDto);
    return {
      message: 'All the posts successfully fetched',
      posts,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findPostById(@Param() findPostByIdDto: FindPostByIdDto) {
    const post = await this.postsService.findPostById(findPostByIdDto);

    return {
      message: 'Post successfully fetched',
      post,
    };
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
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
  async patchPost(@Body() patchPostDto: PatchPostDto) {
    await this.postsService.patchPost(patchPostDto);

    return {
      message: 'Post successfully updated',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deletePost(@Param() deletePostDto: DeletePostDto) {
    await this.postsService.deletePost(deletePostDto);

    return {
      message: 'Post successfully deleted',
    };
  }
}
