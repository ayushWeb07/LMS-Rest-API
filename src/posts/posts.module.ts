import { forwardRef, Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [forwardRef(() => UsersModule)],
  exports: [PostsService],
})
export class PostsModule {}
