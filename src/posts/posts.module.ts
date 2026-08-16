import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './services/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { TagsModule } from '../tags/tags.module';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [TypeOrmModule.forFeature([Post]), UsersModule, TagsModule],
  exports: [PostsService],
})
export class PostsModule {}
