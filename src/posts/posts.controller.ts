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
import { AuthenticatedUser } from '../auth/decorators/authenticated-user.decorator';
import { SetAuthType } from '../auth/decorators/set-auth-type.decorator';
import { AuthType } from '../auth/enums/auth-type.enum';

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
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @AuthenticatedUser('userId') userId: number,
  ) {
    const post = await this.postsService.createPost(createPostDto, userId);

    return {
      message: 'Post successfully created',
      post,
    };
  }

  @SetAuthType(AuthType.NONE)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllPosts(@Query() findPostsDto: FindPostsDto) {
    const posts = await this.postsService.findAllPosts(findPostsDto);
    return {
      message: 'All the posts successfully fetched',
      posts,
    };
  }

  @SetAuthType(AuthType.NONE)
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
  async patchPost(
    @Body() patchPostDto: PatchPostDto,
    @AuthenticatedUser('userId') userId: number,
  ) {
    await this.postsService.patchPost(patchPostDto, userId);

    return {
      message: 'Post successfully updated',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deletePost(
    @Param() deletePostDto: DeletePostDto,
    @AuthenticatedUser('userId') userId: number,
  ) {
    await this.postsService.deletePost(deletePostDto, userId);

    return {
      message: 'Post successfully deleted',
    };
  }
}
