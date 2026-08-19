import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { HashingService } from './services/hashing.service';
import { BcryptService } from './services/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { IServerConfig } from '../config/interfaces/server_config.interface';
import { UsersModule } from '../users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './guards/access-token.guard';
import { AuthGuard } from './guards/auth.guard';
import { SkipAuthGuard } from './guards/skip-auth.guard';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    AccessTokenGuard,
    SkipAuthGuard,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [
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
    UsersModule,
  ],
})
export class AuthModule {}
