import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindPostByIdDto } from './dtos/find-post-by-id.dto';
import { DeletePostDto } from './dtos/delete-post.dto';
import { MetaOption } from '../meta-options/meta-option.entity';
import { TagsService } from '../tags/tags.service';
import { Tag } from '../tags/tag.entity';
import { User } from '../users/user.entity';

/** This is the Posts service */
@Injectable()
export class PostsService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly tagsService: TagsService,

    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(MetaOption)
    private metaOptionRepository: Repository<MetaOption>,
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    // find the user
    const user = await this.usersService.findUserById({
      id: createPostDto.authorId,
    });

    if (!user) {
      throw new NotFoundException(
        `Author with id '${createPostDto.authorId}' does not exist`,
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

  async findAllPosts(): Promise<Post[]> {
    const posts = await this.postRepository.find({
      relations: {
        metaOption: true,
        author: true,
        tags: true,
      },
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

  async patchPost(patchPostDto: PatchPostDto): Promise<void> {
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

    // check if author is updated
    let updatedAuthor: User | null = null;

    if (patchPostDto.authorId) {
      updatedAuthor = await this.usersService.findUserById({
        id: patchPostDto.authorId,
      });

      if (!updatedAuthor) {
        throw new NotFoundException(
          `Author with id '${patchPostDto.authorId}' does not exist`,
        );
      }
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

    // update the author
    post.author = updatedAuthor ?? post.author;

    // update the tags on post
    post.tags = updatedTags.length > 0 ? updatedTags : post.tags;

    // update the post
    await this.postRepository.save(post);
  }

  async deletePost(deletePostDto: DeletePostDto): Promise<void> {
    // find the post
    const post = await this.postRepository.findOne({
      where: {
        id: deletePostDto.id,
      },
    });

    if (!post) {
      throw new NotFoundException(
        `Post with id '${deletePostDto.id}' does not exist`,
      );
    }

    // delete the post
    await this.postRepository.delete({
      id: deletePostDto.id,
    });
  }

  findPosts(userId: string): string {
    if (this.usersService.findOneForPost(userId))
      return `Finding all posts of ${userId}`;

    return `Such user does not exist`;
  }

  findAllPostsOfUser(): string {
    return `Fetching the posts`;
  }
}
