import { forwardRef, Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [forwardRef(() => UsersModule), TypeOrmModule.forFeature([Post])],
  exports: [PostsService],
})
export class PostsModule {}
