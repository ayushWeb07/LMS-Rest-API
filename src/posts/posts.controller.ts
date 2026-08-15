import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
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
import { FindPostByIdDto } from './dtos/find-post-by-id.dto';
import { DeletePostDto } from './dtos/delete-post.dto';

/** This is the Posts controller */
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /** Find posts of one user */
  // @Get(':userId')
  // findPosts(@Param('userId') userId: string) {
  //   return {
  //     message: this.postsService.findPosts(userId),
  //   };
  // }

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

    if (!post) {
      throw new HttpException('Such user does not exist', HttpStatus.NOT_FOUND);
    }

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

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findPostById(@Param() findPostByIdDto: FindPostByIdDto) {
    const post = await this.postsService.findPostById(findPostByIdDto);

    if (!post) {
      throw new HttpException('Such post does not exist', HttpStatus.NOT_FOUND);
    }

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
    const isPostUpdated = await this.postsService.patchPost(patchPostDto);

    if (!isPostUpdated) {
      throw new HttpException('Such post does not exist', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Post successfully updated',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deletePost(@Param() deletePostDto: DeletePostDto) {
    const isPostDeleted = await this.postsService.deletePost(deletePostDto);

    if (!isPostDeleted) {
      throw new HttpException('Such post does not exist', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Post successfully deleted',
    };
  }
}
