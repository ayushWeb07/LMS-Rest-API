import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PostsModule } from '../posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { BulkCreateUsersService } from './bulk-create-users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, BulkCreateUsersService],
  imports: [forwardRef(() => PostsModule), TypeOrmModule.forFeature([User])],
  exports: [UsersService],
})
export class UsersModule {}
