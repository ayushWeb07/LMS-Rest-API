import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { PostsModule } from '../posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../posts/post.entity';
import { User } from '../users/user.entity';
import { Tag } from '../tags/tag.entity';
import { TagsModule } from '../tags/tags.module';
import { MetaOption } from '../meta-options/meta-option.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'learning_nest_db',
        entities: [User, Post, Tag, MetaOption],
        synchronize: true,
      }),
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
