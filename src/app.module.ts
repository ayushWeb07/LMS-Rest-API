import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts/post.entity';
import { User } from './users/user.entity';
import { Tag } from './tags/tag.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOption } from './meta-options/meta-option.entity';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import type { IDatabaseConfig } from './config/interfaces/database_config.interface';
import databaseConfig from './config/database.config';
import serverConfig from './config/server.config';
import envsValidationSchema from './config/validations/envs.validation';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {
  ApiResponseFormatterInterceptor
} from './common/interceptors/api-response-formatter/api-response-formatter.interceptor';

const NODE_ENV = process.env.NODE_ENV ?? 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envsValidationSchema,
      load: [serverConfig, databaseConfig],
      envFilePath: `.env.${NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // get the database config
        const databaseConfig = configService.get<IDatabaseConfig>('database');

        if (!databaseConfig) {
          throw new Error('Database configuration must be setup');
        }
        return {
          type: 'mysql',
          host: databaseConfig.host,
          port: databaseConfig.port,
          username: databaseConfig.user,
          password: databaseConfig.pass,
          database: databaseConfig.name,
          entities: [User, Post, Tag, MetaOption],
          synchronize: NODE_ENV === 'development',
        };
      },
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    TagsModule,
    MetaOptionsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiResponseFormatterInterceptor,
    },
  ],
})
export class AppModule {}
