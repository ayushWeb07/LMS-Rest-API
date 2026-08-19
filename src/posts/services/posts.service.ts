import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindPostByIdDto } from '../dtos/find-post-by-id.dto';
import { DeletePostDto } from '../dtos/delete-post.dto';
import { TagsService } from '../../tags/services/tags.service';
import { Tag } from '../../tags/tag.entity';
import { FindPostsDto } from '../dtos/find-posts.dto';

/** This is the Posts service */
@Injectable()
export class PostsService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly tagsService: TagsService,

    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async createPost(
    createPostDto: CreatePostDto,
    userId: number,
  ): Promise<Post> {
    // find the user
    const user = await this.usersService.findUserById({
      id: userId,
    });

    if (!user) {
      throw new UnauthorizedException(
        `We cannot identify you as an authenticated user. Please login again`,
      );
    }

    // find the tags
    const tags = await this.tagsService.findMultipleTags({
      tagIds: createPostDto.tagIds,
    });

    if (tags.length !== createPostDto.tagIds.length) {
      throw new BadRequestException(
        `Found one or more invalid tags on the post`,
      );
    }

    // create the post instance
    let newPost = this.postRepository.create({
      ...createPostDto,
      author: user,
      tags,
    });

    // save it
    newPost = await this.postRepository.save(newPost);
    return newPost;
  }

  async findAllPosts(findPostsDto: FindPostsDto): Promise<Post[]> {
    const posts = await this.postRepository.find({
      relations: {
        metaOption: true,
        author: true,
        tags: true,
      },
      take: findPostsDto.limit,
      skip: (findPostsDto.page - 1) * findPostsDto.limit,
    });
    return posts;
  }

  async findPostById(findPostByIdDto: FindPostByIdDto): Promise<Post> {
    // find the post by id
    const post = await this.postRepository.findOne({
      where: {
        id: findPostByIdDto.id,
      },
      relations: {
        metaOption: true,
        author: true,
        tags: true,
      },
    });

    if (!post) {
      throw new NotFoundException(
        `Post with id '${findPostByIdDto.id}' does not exist`,
      );
    }

    return post;
  }

  async patchPost(patchPostDto: PatchPostDto, userId: number): Promise<void> {
    // find the user by id
    const user = await this.usersService.findUserById({
      id: userId,
    });

    if (!user) {
      throw new UnauthorizedException(
        `We cannot identify you as an authenticated user. Please login again`,
      );
    }

    // find the post
    const post = await this.postRepository.findOne({
      where: {
        id: patchPostDto.id,
      },
      relations: {
        tags: true,
        author: true,
      },
    });

    if (!post) {
      throw new NotFoundException(
        `Post with id '${patchPostDto.id}' does not exist`,
      );
    }

    // check if the current user is actually its author
    if (post.author.id !== userId) {
      throw new UnauthorizedException(
        'You do not have the permissions to update this post',
      );
    }

    // check if tags got updated
    let updatedTags: Tag[] = [];

    if (patchPostDto.tagIds) {
      updatedTags = await this.tagsService.findMultipleTags({
        tagIds: patchPostDto.tagIds,
      });

      if (updatedTags.length !== patchPostDto.tagIds.length) {
        throw new BadRequestException(
          `Found one or more invalid tags on the post`,
        );
      }
    }

    // update the post properties
    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.thumbnailUrl = patchPostDto.thumbnailUrl ?? post.thumbnailUrl;
    post.postType = patchPostDto.postType ?? post.postType;
    post.postStatus = patchPostDto.postStatus ?? post.postStatus;

    // update the tags on post
    post.tags = updatedTags.length > 0 ? updatedTags : post.tags;

    // update the post
    await this.postRepository.save(post);
  }

  async deletePost(
    deletePostDto: DeletePostDto,
    userId: number,
  ): Promise<void> {
    // find the user by id
    const user = await this.usersService.findUserById({
      id: userId,
    });

    if (!user) {
      throw new UnauthorizedException(
        `We cannot identify you as an authenticated user. Please login again`,
      );
    }

    // find the post
    const post = await this.postRepository.findOne({
      where: {
        id: deletePostDto.id,
      },
      relations: {
        author: true,
      },
    });

    if (!post) {
      throw new NotFoundException(
        `Post with id '${deletePostDto.id}' does not exist`,
      );
    }

    // check if the current user is actually its author
    if (post.author.id !== userId) {
      throw new UnauthorizedException(
        'You do not have the permissions to delete this post',
      );
    }

    // delete the post
    await this.postRepository.delete({
      id: deletePostDto.id,
    });
  }
}
