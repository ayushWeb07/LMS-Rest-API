import { forwardRef, Inject, Injectable } from '@nestjs/common';
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

  async createPost(createPostDto: CreatePostDto): Promise<Post | null> {
    // find the user
    const user = await this.usersService.findUserById({
      id: createPostDto.authorId,
    });

    if (!user) return null;

    // find the tags

    // create the post instance
    let newPost = this.postRepository.create({
      ...createPostDto,
      author: user,
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
      },
    });
    return posts;
  }

  async findPostById(findPostByIdDto: FindPostByIdDto): Promise<Post | null> {
    const post = await this.postRepository.findOne({
      where: {
        id: findPostByIdDto.id,
      },
      relations: {
        metaOption: true,
        author: true,
      },
    });

    return post;
  }

  async patchPost(patchPostDto: PatchPostDto): Promise<void> {
    // update the post
    await this.postRepository.update(
      {
        id: patchPostDto.id,
      },
      {
        ...patchPostDto,
      },
    );
  }

  async deletePost(deletePostDto: DeletePostDto): Promise<boolean> {
    // find the post
    const post = await this.postRepository.findOne({
      where: {
        id: deletePostDto.id,
      },
    });

    if (!post) return false;

    // delete the post
    await this.postRepository.delete({
      id: deletePostDto.id,
    });

    return true;
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
