import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindPostByIdDto } from './dtos/find-post-by-id.dto';
import { DeletePostDto } from './dtos/delete-post.dto';

/** This is the Posts service */
@Injectable()
export class PostsService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    // create the post instance
    let newPost = this.postRepository.create(createPostDto);

    // save it
    newPost = await this.postRepository.save(newPost);

    return newPost;
  }

  async findAllPosts(): Promise<Post[]> {
    const posts = await this.postRepository.find();
    return posts;
  }

  async findPostById(findPostByIdDto: FindPostByIdDto): Promise<Post | null> {
    const post = await this.postRepository.findOne({
      where: {
        id: findPostByIdDto.id,
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

  async deletePost(deletePostDto: DeletePostDto): Promise<void> {
    // delete the post
    await this.postRepository.softDelete({
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
