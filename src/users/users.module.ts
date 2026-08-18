import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { BulkCreateUsersService } from './services/bulk-create-users.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { IServerConfig } from '../config/interfaces/server_config.interface';

@Module({
  controllers: [UsersController],
  providers: [UsersService, BulkCreateUsersService],
  imports: [
    TypeOrmModule.forFeature([User]),

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // get the server config
        const serverConfig = configService.get<IServerConfig>('server');

        if (!serverConfig) {
          throw new Error('Server configuration must be setup');
        }

        return {
          secret: serverConfig.jwtSecretKey,
          signOptions: {
            expiresIn: serverConfig.jwtExpires,
          },
        };
      },
    }),
  ],
  exports: [UsersService],
})
export class UsersModule {}
